# Proof of Presence dApp

A decentralized application for tracking and verifying event attendance using blockchain technology.

## Overview

Proof of Presence is a Web3 application that allows users to:

- Register their presence at events
- Track their attendance history
- View upcoming and past events
- Manage events (for administrators)

The application uses blockchain technology to provide immutable proof of attendance, making it ideal for conferences, meetups, and other events where attendance verification is important.

## Features

- **Event Registration**: Users can register their presence at events
- **Attendance History**: View your complete attendance history
- **Event Management**: Administrators can create and manage events
- **Web3 Integration**: Built with RainbowKit and Wagmi for seamless Web3 integration
- **Mobile Responsive**: Fully responsive design for both desktop and mobile devices

## Tech Stack

- **Frontend**:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - shadcn/ui
- **Web3**:
  - RainbowKit
  - Wagmi
  - Ethers.js
- **Blockchain**:
  - Ethereum (Mainnet)
  - Sepolia Testnet
  - XDC Testnet

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Web3 wallet (like MetaMask)

### Installation

1. Clone the repository:

```sh
git clone <repository-url>
cd presence-proof-tracker-dapp
```

2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Usage

1. Connect your Web3 wallet using the "Connect Wallet" button
2. Browse available events
3. Register your presence at events
4. View your attendance history in the "My History" section
5. (For administrators) Manage events through the admin panel

## Smart Contract

The application interacts with a smart contract that handles:

- Event creation and management
- Presence registration
- Attendance tracking
- User history

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
