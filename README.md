# SquadSats 🤑

**Pool funds with friends and auto-invest in crypto, together.**

A Base MiniApp that allows groups of friends to pool small amounts of crypto and collectively invest in curated digital assets. Democratizes crypto investing for beginners by offering simple choices and automating the investment process.

## 🌟 Features

### Core Functionality
- **Group Fund Creation**: Initiate shared investment funds with friends
- **Contribution Tracking**: Real-time dashboard showing pooled amounts and member contributions
- **Friend Invitation**: Easy sharing via Farcaster mentions and links
- **Curated Asset Selection**: Limited, beginner-friendly crypto asset choices
- **Auto-Investment**: Automatic pooled investment when target is reached
- **Wallet Integration**: Seamless Base Wallet connection and transactions

### Technical Features
- **Base Network Integration**: Built on Base for low-cost transactions
- **Smart Contract Powered**: Decentralized fund management and asset allocation
- **Farcaster Social**: Social primitives for friend discovery and mentions
- **Mobile-First Design**: Optimized for Base MiniApp environment
- **Real-time Updates**: Live contribution and fund status tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Coinbase OnchainKit API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/afaa46af-be63-47b2-9ed6-d81aa6725dad.git
   cd afaa46af-be63-47b2-9ed6-d81aa6725dad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Development**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base Network
- **Wallet**: Base Wallet via Coinbase OnchainKit
- **Social**: Farcaster MiniApp SDK

### Data Model

#### GroupFund
```typescript
{
  fundId: string;
  fundName: string;
  targetAsset: string;
  createdByUserId: string;
  createdAt: Date;
  currentAmount: bigint;
  targetAmount: bigint;
  status: 'active' | 'funded' | 'invested' | 'completed';
}
```

#### GroupMember
```typescript
{
  memberId: string;
  fundId: string;
  userId: string;
  joinedAt: Date;
  contributionAmount: bigint;
  status: 'pending' | 'contributing' | 'completed';
}
```

#### Contribution
```typescript
{
  contributionId: string;
  memberId: string;
  fundId: string;
  amount: bigint;
  transactionHash: string;
  timestamp: Date;
}
```

## 🎨 Design System

### Colors
- **Primary**: Yellow (#EAB308) - For CTAs and highlights
- **Background**: Light gray (#F8FAFC)
- **Surface**: White (#FFFFFF)
- **Text**: Dark gray (#1E293B)

### Components
- `AppShell`: Main application container
- `FundCard`: Displays fund information and progress
- `ContributionButton`: Handles contribution transactions
- `MemberListItem`: Shows member contribution status
- `NotificationBanner`: Displays system messages

## 🔧 Smart Contracts

The application uses custom smart contracts deployed on Base for:
- Fund creation and management
- Multi-signature contribution handling
- Automated asset allocation
- Secure fund distribution

### Contract Addresses
- **Fund Manager**: [To be deployed]
- **Asset Allocation**: [To be deployed]

## 📱 User Flows

### 1. Fund Creation
1. User initiates "Create New Fund"
2. Selects target cryptocurrency from curated list
3. Sets fund name and target amount
4. Shares invitation link with friends

### 2. Friend Onboarding
1. Friend clicks shared link
2. Connects Base Wallet
3. Views fund details and contribution amount
4. Confirms contribution transaction

### 3. Auto-Investment
1. System monitors fund progress
2. When target reached, triggers smart contract
3. Automatically invests pooled funds
4. Notifies all members of successful investment

## 🧪 Testing

```bash
# Run tests
npm run test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🚀 Deployment

### Using Deploy Script
```bash
./deploy.sh
```

### Manual Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Configure environment variables in production

## 📊 Business Model

- **Revenue**: 0.5% transaction fee on successful pooled investments
- **Target Market**: Crypto-curious beginners, social groups
- **Value Proposition**: Makes crypto investing accessible and social

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Create an issue in this repository
- Contact the development team

---

**Built with ❤️ for the Base ecosystem**

