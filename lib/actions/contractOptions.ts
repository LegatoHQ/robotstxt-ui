import { ethers } from 'ethers'

export interface IContractOptions {
  CHAIN_ID: number
  RPC: string
  ROBOTS_TXT: string
  ROBOT_TOKEN: string
  ETHERSCAN_URL: string
}

export const mumbaiContractOptions: IContractOptions = {
  CHAIN_ID: 80001,
  RPC: 'https://crimson-dawn-layer.matic-testnet.discover.quiknode.pro/2f96338b3a272ff0801a885469489d340d782714',
  ROBOTS_TXT: '0x22bFb245BBde60Cef249C0Eb60Fb898e8214a310',
  ROBOT_TOKEN: '0x471B5200Bf6C7AEBa606b67B92f897368134A67a',
  ETHERSCAN_URL: 'https://mumbai.polygonscan.com/address/[ADDRESS]',
} as const
export const polygonContractOptions: IContractOptions = {
  CHAIN_ID: 137,
  RPC: 'https://polygon-mainnet.infura.io/v3/855f45a706ee4f5d8127b569538010d3',
  ROBOTS_TXT: '0xf4B81520651F33A42622174F31c2dD8F96D752Dc',
  ROBOT_TOKEN: '0x4Bd206c4ed0fCfd998108b1D888929578c5b88a4',
  ETHERSCAN_URL: 'https://polygonscan.com/address/[ADDRESS]',
} as const
export const mainNetContractOptions: IContractOptions = {
  CHAIN_ID: 1,
  RPC: 'https://mainnet.infura.io/v3/c97ed77531d74d5287facb6404446a0b',
  ROBOTS_TXT: '0x0f915BcB200ec11C0274453CD3D9F71614063B4A',
  ROBOT_TOKEN: '0x3b2AEb40ce5f323cA33d42D8c030abb17fF2E5ce',
  ETHERSCAN_URL: 'https://etherscan.io/address/[ADDRESS]',
} as const
export const allContractOptions: IContractOptions[] = [mumbaiContractOptions, polygonContractOptions, mainNetContractOptions]
export function getEtherscanUrl(chain: IContractOptions, address: string) {
  return chain.ETHERSCAN_URL.replace('[ADDRESS]', address)
}

export const getContractsFor = (chainId?: number): IContractOptions =>
  allContractOptions.find((opt: IContractOptions) => opt.CHAIN_ID === chainId) || mumbaiContractOptions
