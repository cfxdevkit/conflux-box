# Conflux Box

A modern, beautiful frontend for Conflux blockchain development, built with **Mantine UI** and powered by the **published Conflux DevKit packages**.

## ✨ Features

- **Modern UI**: Built with Mantine UI components for a clean, professional interface
- **Dual-Chain Support**: Works with both Conflux Core and eSpace networks
- **Real-time Updates**: WebSocket integration for live blockchain data
- **Account Management**: Create and manage development accounts
- **Smart Contracts**: Deploy and interact with contracts
- **Network Monitoring**: Real-time network status and configuration
- **TypeScript**: Full type safety throughout the application

## 🏗️ Architecture

This project demonstrates how to use the published Conflux DevKit packages:

- **Frontend**: React + Vite + Mantine UI
- **Backend**: Uses `@conflux-devkit/backend` package
- **Blockchain**: Uses `@conflux-devkit/node` package
- **State Management**: Zustand + React Query

## 📦 Published Packages Used

- [`@conflux-devkit/node@^0.1.0`](https://www.npmjs.com/package/@conflux-devkit/node) - Core blockchain functionality
- [`@conflux-devkit/backend@^0.1.0`](https://www.npmjs.com/package/@conflux-devkit/backend) - Backend API and WebSocket services

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or create new project
npm install

# Start the backend service (uses published @conflux-devkit/backend)
node backend-service.js
```

In another terminal:

```bash
# Start the frontend development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript checks
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Backend Service

The `backend-service.js` file demonstrates how to use the published `@conflux-devkit/backend` package:

```javascript
import { BackendServer } from '@conflux-devkit/backend';

const server = new BackendServer({
  port: 3001,
  wsPort: 3002,
  devkitConfig: {
    chainId: 2029,
    evmChainId: 2030,
    // ... configuration
  },
});

await server.start();
```

### Frontend Integration

The frontend uses the published `@conflux-devkit/node` package:

```typescript
import { DevKit, CoreClient, EspaceClient } from '@conflux-devkit/node';

const devkit = new DevKit({
  chainId: 2029,
  evmChainId: 2030,
  // ... configuration
});
```

## 🏗️ Project Structure

```
conflux-box/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # React hooks for DevKit integration
│   ├── services/      # API and DevKit services
│   ├── stores/        # Zustand stores
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
├── backend-service.js # Backend service using published package
└── package.json       # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```bash
# Backend API endpoints
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3002

# Development mnemonic (for testing only!)
HARDHAT_VAR_DEPLOYER_MNEMONIC="test test test test test test test test test test test junk"

# Network configuration
VITE_CORE_CHAIN_ID=2029
VITE_EVM_CHAIN_ID=2030
```

### Network Configuration

The application supports multiple network modes:

- **Local Development**: Connects to local development nodes
- **Testnet**: Connects to Conflux testnet
- **Mainnet**: Connects to Conflux mainnet

## 🎨 UI Components

Built with Mantine UI for a modern, accessible interface:

- **Dashboard**: Overview of network status and accounts
- **Accounts**: Manage development accounts and view balances
- **Contracts**: Deploy and interact with smart contracts
- **Network**: Monitor and configure network settings
- **Settings**: Application and development preferences

## 🔌 API Integration

### REST API Endpoints

The backend provides these endpoints:

- `GET /api/devkit/status` - DevKit status
- `GET /api/devkit/accounts` - List accounts
- `POST /api/devkit/accounts` - Create account
- `GET /api/devkit/balance/:address` - Get balance
- `POST /api/devkit/transactions` - Send transaction

### WebSocket Events

Real-time updates via WebSocket:

- `devkit:status` - Status updates
- `devkit:transaction` - Transaction events
- `devkit:block` - New block notifications

## 🧪 Testing

The project includes:

- **Unit tests**: Component and utility testing
- **Integration tests**: API and DevKit integration
- **E2E tests**: Full application workflows

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Backend

The backend can be deployed as a standalone service:

```bash
# Install globally
npm install -g @conflux-devkit/backend

# Run the service
conflux-devkit-backend
```

Or use the local backend service:

```bash
node backend-service.js
```

## 📖 Documentation

- [Conflux DevKit Node Documentation](https://www.npmjs.com/package/@conflux-devkit/node)
- [Conflux DevKit Backend Documentation](https://www.npmjs.com/package/@conflux-devkit/backend)
- [Mantine UI Documentation](https://mantine.dev/)
- [Conflux Documentation](https://doc.confluxnetwork.org/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Conflux Network** for the blockchain platform
- **Mantine** for the beautiful UI components
- **Vite** for the fast development experience
- **React Query** for data fetching and caching