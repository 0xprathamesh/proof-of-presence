
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  ConnectButton,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, sepolia,xdcTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, sepolia,xdcTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Proof of Presence dApp',
  projectId: 'YOUR_WALLETCONNECT_ID', // Replace with your WalletConnect project ID or use a placeholder
  chains
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { WagmiConfig, RainbowKitProvider, chains, ConnectButton };
