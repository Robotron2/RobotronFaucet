import { createAppKit } from "@reown/appkit/react"
import { EthersAdapter } from "@reown/appkit-adapter-ethers"
import { liskSepolia, type AppKitNetwork } from "@reown/appkit/networks"

// 1. Get projectId
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID

// 2. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [liskSepolia]
// const networks: [AppKitNetwork, ...AppKitNetwork[]] = [liskSepolia]

// 3. Create a metadata object - optional
const metadata = {
	name: "Faucet dApp",
	description: "ERC20 faucet",
	url: "https://mywebsite.com",
	icons: ["https://avatars.mywebsite.com/"],
}

// 4. Create a AppKit instance
export const appkit = createAppKit({
	adapters: [new EthersAdapter()],
	networks,
	metadata,
	projectId,
	allowUnsupportedChain: false,
	allWallets: "SHOW",
	defaultNetwork: liskSepolia,
	enableEIP6963: true,
	features: {
		analytics: true,
		allWallets: true,
		email: false,
		socials: [],
	},
})

appkit.switchNetwork(liskSepolia)
