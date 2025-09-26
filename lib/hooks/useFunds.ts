import { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { GroupFund, User } from '@/lib/types';
import { createFund, contributeToFund, getFundDetails, getUserContribution } from '@/lib/contracts';
import { generateFundId, generateMemberId, generateContributionId } from '@/lib/utils';
import { CURATED_ASSETS, getAssetBySymbol } from '@/lib/curatedAssets';

export function useFunds() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [funds, setFunds] = useState<GroupFund[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load funds from localStorage (for demo - in production this would come from contract events)
  useEffect(() => {
    const savedFunds = localStorage.getItem('squadsats_funds');
    if (savedFunds) {
      try {
        const parsedFunds = JSON.parse(savedFunds);
        setFunds(parsedFunds);
      } catch (e) {
        console.error('Error loading funds from localStorage:', e);
      }
    }
  }, []);

  // Save funds to localStorage
  const saveFunds = (newFunds: GroupFund[]) => {
    localStorage.setItem('squadsats_funds', JSON.stringify(newFunds));
    setFunds(newFunds);
  };

  const createNewFund = async (fundData: {
    name: string;
    targetAsset: string;
    targetAmount: number;
  }) => {
    if (!address || !walletClient) {
      setError('Wallet not connected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const asset = getAssetBySymbol(fundData.targetAsset);
      if (!asset) {
        throw new Error('Invalid asset selected');
      }

      const fundId = generateFundId();

      // Create fund on contract
      const result = await createFund(
        fundId,
        asset.contractAddress as `0x${string}`,
        BigInt(Math.floor(fundData.targetAmount * 10 ** 18)), // Assuming 18 decimals
        walletClient
      );

      if (!result.success) {
        throw new Error('Failed to create fund on blockchain');
      }

      // Create local fund object
      const newFund: GroupFund = {
        fundId,
        fundName: fundData.name,
        targetAsset: fundData.targetAsset,
        createdByUserId: address,
        createdAt: new Date(),
        currentAmount: 0,
        targetAmount: fundData.targetAmount,
        status: 'active',
        members: [
          {
            memberId: generateMemberId(),
            fundId,
            userId: address,
            joinedAt: new Date(),
            contributionAmount: 0,
            status: 'pending',
            user: {
              userId: address,
              walletAddress: address,
              displayName: 'You',
              avatar: undefined
            }
          }
        ],
        contributions: []
      };

      const updatedFunds = [newFund, ...funds];
      saveFunds(updatedFunds);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create fund');
    } finally {
      setLoading(false);
    }
  };

  const contributeToFundLocal = async (fundId: string, amount: number) => {
    if (!address || !walletClient) {
      setError('Wallet not connected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fund = funds.find(f => f.fundId === fundId);
      if (!fund) {
        throw new Error('Fund not found');
      }

      const asset = getAssetBySymbol(fund.targetAsset);
      if (!asset) {
        throw new Error('Invalid asset');
      }

      // Contribute to contract
      const result = await contributeToFund(
        fundId,
        BigInt(Math.floor(amount * 10 ** 18)), // Assuming 18 decimals
        walletClient
      );

      if (!result.success) {
        throw new Error('Failed to contribute to fund');
      }

      // Update local state
      const updatedFunds = funds.map(f => {
        if (f.fundId === fundId) {
          const existingMember = f.members.find(m => m.userId === address);
          const contributionId = generateContributionId();

          if (existingMember) {
            existingMember.contributionAmount += amount;
            existingMember.status = 'completed';
          } else {
            f.members.push({
              memberId: generateMemberId(),
              fundId,
              userId: address,
              joinedAt: new Date(),
              contributionAmount: amount,
              status: 'completed',
              user: {
                userId: address,
                walletAddress: address,
                displayName: 'You',
                avatar: undefined
              }
            });
          }

          f.contributions.push({
            contributionId,
            memberId: existingMember?.memberId || generateMemberId(),
            fundId,
            amount,
            timestamp: new Date()
          });

          f.currentAmount += amount;

          // Check if fund is now funded
          if (f.currentAmount >= f.targetAmount) {
            f.status = 'funded';
          }
        }
        return f;
      });

      saveFunds(updatedFunds);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to contribute');
    } finally {
      setLoading(false);
    }
  };

  const refreshFundData = async (fundId: string) => {
    try {
      const contractData = await getFundDetails(fundId);
      if (contractData) {
        // Update local state with contract data
        const updatedFunds = funds.map(fund => {
          if (fund.fundId === fundId) {
            return {
              ...fund,
              currentAmount: Number(contractData.currentAmount) / 10 ** 18,
              status: ['active', 'funded', 'invested', 'completed'][contractData.status] as any
            };
          }
          return fund;
        });
        saveFunds(updatedFunds);
      }
    } catch (err) {
      console.error('Error refreshing fund data:', err);
    }
  };

  return {
    funds,
    loading,
    error,
    isConnected,
    address,
    createNewFund,
    contributeToFundLocal,
    refreshFundData
  };
}

