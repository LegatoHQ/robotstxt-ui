import '@rainbow-me/rainbowkit/styles.css'
import { ReactNode } from 'react'

import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import { ETH_CHAINS_PROD, ETH_CHAINS_TEST } from '@/lib/constants'
import { allContractOptions, getContractsFor} from '@/lib/actions/contractOptions'
import { polygon } from '@wagmi/chains'

interface Props {
  children: ReactNode
  autoConnect?: boolean
}

export function RainbowKit(props: Props) {
  // polygon.rpcUrls.default.http = ['https://rpc-mainnet.maticvigil.com/']
  const CHAINS = process.env.NODE_ENV === 'production' ? ETH_CHAINS_PROD : ETH_CHAINS_TEST
  
  // const CHAINS = ETH_CHAINS_TEST
  const { chains, provider } = configureChains(CHAINS,
   [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: getContractsFor(chain.id).RPC,
      }),
    }),
   ] 
    // allContractOptions.map((contractOption) => {
    //   return jsonRpcProvider({
    //     rpc:()=>({http: contractOption.RPC , chainId: contractOption.CHAIN_ID}),
    //   })
    // }),
  )

  const { connectors } = getDefaultWallets({
    appName: 'District Labs',
    chains,
  })

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#218242',
          accentColorForeground: 'white',
          borderRadius: 'large',
          fontStack: 'system',
          overlayBlur: 'large',
        })}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
