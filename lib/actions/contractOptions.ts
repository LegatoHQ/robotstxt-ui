import { ethers } from 'ethers'

export interface IContractOptions {
  CHAIN_ID: number
  RPC: string
  ROBOTS_TXT: string
  ROBOT_TOKEN: string
}

export const mumbaiContractOptions: IContractOptions = {
  CHAIN_ID: 80001,
  RPC: 'https://crimson-dawn-layer.matic-testnet.discover.quiknode.pro/2f96338b3a272ff0801a885469489d340d782714',
  ROBOTS_TXT: '0x0Ea7e007A685fF512eEC85c8cc3363510841af0E',
  ROBOT_TOKEN: '0xB79a34A487a5aB6e8Bb50E4135eBaDFc48530baD',
}
export const allContractOptions: IContractOptions[] = [mumbaiContractOptions]

export const getContractsFor = (chainId?: number): IContractOptions =>
  allContractOptions.find((opt: IContractOptions) => opt.CHAIN_ID === chainId) || mumbaiContractOptions
