import { createPublicClient, createWalletClient, http, Address } from 'viem';
import { base } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// Contract ABI - simplified for MVP
export const SQUAD_SATS_FUND_ABI = [
  // Fund creation
  {
    inputs: [
      { name: 'fundId', type: 'string' },
      { name: 'targetAsset', type: 'address' },
      { name: 'targetAmount', type: 'uint256' }
    ],
    name: 'createFund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Contribution
  {
    inputs: [
      { name: 'fundId', type: 'string' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'contribute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Get fund details
  {
    inputs: [{ name: 'fundId', type: 'string' }],
    name: 'getFund',
    outputs: [
      { name: 'creator', type: 'address' },
      { name: 'targetAsset', type: 'address' },
      { name: 'targetAmount', type: 'uint256' },
      { name: 'currentAmount', type: 'uint256' },
      { name: 'createdAt', type: 'uint256' },
      { name: 'status', type: 'uint8' },
      { name: 'contributors', type: 'address[]' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // Get contribution
  {
    inputs: [
      { name: 'fundId', type: 'string' },
      { name: 'user', type: 'address' }
    ],
    name: 'getContribution',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'fundId', type: 'string' },
      { indexed: true, name: 'creator', type: 'address' },
      { indexed: false, name: 'targetAsset', type: 'address' },
      { indexed: false, name: 'targetAmount', type: 'uint256' }
    ],
    name: 'FundCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'fundId', type: 'string' },
      { indexed: true, name: 'contributor', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' }
    ],
    name: 'ContributionMade',
    type: 'event'
  }
] as const;

// Contract address - would be deployed contract address
export const SQUAD_SATS_FUND_ADDRESS = '0x0000000000000000000000000000000000000000'; // Placeholder

// Create clients
export const publicClient = createPublicClient({
  chain: base,
  transport: http()
});

// Wallet client for transactions (would use user's wallet in production)
export function createWalletClientWithAccount(privateKey?: string) {
  const account = privateKey ? privateKeyToAccount(privateKey as `0x${string}`) : undefined;

  return createWalletClient({
    account,
    chain: base,
    transport: http()
  });
}

// Contract interaction functions
export async function createFund(
  fundId: string,
  targetAsset: Address,
  targetAmount: bigint,
  walletClient: any
) {
  try {
    const hash = await walletClient.writeContract({
      address: SQUAD_SATS_FUND_ADDRESS as Address,
      abi: SQUAD_SATS_FUND_ABI,
      functionName: 'createFund',
      args: [fundId, targetAsset, targetAmount]
    });

    return { success: true, hash };
  } catch (error) {
    console.error('Error creating fund:', error);
    return { success: false, error };
  }
}

export async function contributeToFund(
  fundId: string,
  amount: bigint,
  walletClient: any
) {
  try {
    const hash = await walletClient.writeContract({
      address: SQUAD_SATS_FUND_ADDRESS as Address,
      abi: SQUAD_SATS_FUND_ABI,
      functionName: 'contribute',
      args: [fundId, amount]
    });

    return { success: true, hash };
  } catch (error) {
    console.error('Error contributing to fund:', error);
    return { success: false, error };
  }
}

export async function getFundDetails(fundId: string) {
  try {
    const result = await publicClient.readContract({
      address: SQUAD_SATS_FUND_ADDRESS as Address,
      abi: SQUAD_SATS_FUND_ABI,
      functionName: 'getFund',
      args: [fundId]
    });

    return {
      creator: result[0],
      targetAsset: result[1],
      targetAmount: result[2],
      currentAmount: result[3],
      createdAt: result[4],
      status: result[5],
      contributors: result[6]
    };
  } catch (error) {
    console.error('Error getting fund details:', error);
    return null;
  }
}

export async function getUserContribution(fundId: string, userAddress: Address) {
  try {
    const result = await publicClient.readContract({
      address: SQUAD_SATS_FUND_ADDRESS as Address,
      abi: SQUAD_SATS_FUND_ABI,
      functionName: 'getContribution',
      args: [fundId, userAddress]
    });

    return result;
  } catch (error) {
    console.error('Error getting user contribution:', error);
    return BigInt(0);
  }
}
