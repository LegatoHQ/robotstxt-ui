import { arbitrum, goerli, hardhat, mainnet, optimism, polygon, polygonMumbai, sepolia } from '@wagmi/chains'

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Application
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export const SITE_CANONICAL = 'https://turbo.district.dev'
export const SITE_EMOJI = '⚡'
export const SITE_NAME = 'robotstxt.xyz'
export const SITE_TITLE = 'robotstxt.xyz - default usage licenses for eth addresses'
export const SITE_DESCRIPTION = 'Declare a default license for any eth address you own.'
export const SOCIAL_TWITTER = 'KamesGeraghty'
export const SOCIAL_GITHUB = 'turbo-eth/template-web3-app'

export const APP_CONFIG = {
  canonical: SITE_CANONICAL,
  emoji: SITE_EMOJI,
  title: SITE_TITLE,
  site_name: SITE_NAME,
  description: SITE_DESCRIPTION,
  previewImg: `${SITE_CANONICAL}/preview.png`,
  locale: 'en',
  twitter: SOCIAL_TWITTER,
}

export const DEPLOY_URL =
  'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fturbo-eth%2Ftemplate-web3-app&project-name=TurboETH&repository-name=turbo-eth&demo-title=TurboETH&env=APP_ADMINS,NEXT_PUBLIC_ALCHEMY_API_KEY,NEXTAUTH_SECRET,ETHERSCAN_API_KEY,ETHERSCAN_API_KEY_OPTIMISM,ETHERSCAN_API_KEY_ARBITRUM,ETHERSCAN_API_KEY_POLYGON,DATABASE_URL&envDescription=How%20to%20get%20these%20env%20variables%3A&envLink=https%3A%2F%2Fgithub.com%2Fturbo-eth%2Ftemplate-web3-app%2Fblob%2Fmain%2F.env.example'

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Design
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export const THEME_INITIAL_COLOR = 'system'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Blockchain
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Override the default Goerli icon so it's not the same as the default Ethereum icon

// @ts-ignore
goerli.iconUrl = '/icons/NetworkEthereumTest.svg'
// @ts-ignore
sepolia.iconUrl = '/icons/NetworkEthereumTest.svg'

export const ETH_CHAINS = [mainnet, polygon, optimism, arbitrum, goerli]
export const ETH_CHAINS_PROD = [mainnet, polygon, optimism, arbitrum]
export const ETH_CHAINS_TEST = [polygonMumbai, mainnet, polygon, optimism, arbitrum, goerli, sepolia, hardhat]
