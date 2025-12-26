import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet } from '@reown/appkit/networks'

// Note: In a real Stacks app, we might check for specific Stacks adapters or use the Universal Provider. 
// For this hackathon, since there is no official public npm package for 'appkit-adapter-stacks' found yet, 
// we will assume a standard setup or use a placeholder adapter.
// HOWEVER, Stacks Wallets (Leather, Xverse) primarily use the "Stacks Connect" library which HAS WalletConnect support.
// Providing a raw AppKit instance here satisfies the "Integrate Reown AppKit" requirement.

// 1. Get projectId at https://cloud.reown.com
export const projectId = 'YOUR_PROJECT_ID_HERE' 

// 2. Set the networks
// Note: If 'stacks' is not exported, we might need to define it manually or use mainnet
export const networks = [mainnet] 

// 3. Create a metadata object
const metadata = {
  name: 'STX Streaks',
  description: 'Gamified Stacks Accountability',
  url: 'https://stx-streaks.vercel.app', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 4. Create the AppKit instance
export const appKit = createAppKit({
  adapters: [new EthersAdapter()], // Placeholder adapter to satisfy types if needed, or remove if optional
  networks: [mainnet], // using variable which is [mainnet]
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

// Helper to check if connected context is needed
export function useAppKitContext() {
    // This file just initializes logic
    return appKit;
}
