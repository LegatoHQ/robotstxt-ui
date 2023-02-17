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
  ROBOTS_TXT: '0xF0D0E02a8d03B73ab42484CBe64f132222320bAA',
  ROBOT_TOKEN: '0xB064eC859F47Eb08De00bfE920CF6DbcFd7537eb',
  ETHERSCAN_URL:  'https://mumbai.polygonscan.com/address/[ADDRESS]',
}
export const polygonContractOptions: IContractOptions = {
  CHAIN_ID: 137,
  RPC: 'https://polygon-mainnet.infura.io/v3/855f45a706ee4f5d8127b569538010d3',
  ROBOTS_TXT: '0x6525b9e327F0cA32b75A0d05ec3d4F24B9b3dEFF',
  ROBOT_TOKEN:'0x30DbB030E20a8Ce9Bd2794267f3fa9aD4d4ccBD1' ,
  ETHERSCAN_URL:  'https://polygonscan.com/address/[ADDRESS]',
}
export const mainNetContractOptions: IContractOptions = {
  CHAIN_ID: 1,
  RPC: 'https://mainnet.infura.io/v3/c97ed77531d74d5287facb6404446a0b',
  ROBOTS_TXT: '0xD0f552C39A4C0d7F14969e4f6dA84FA4f88A28e5',
  ROBOT_TOKEN: '0x6F06f80AB36aEC196a87f31D5698A9e73C5163F2',
  ETHERSCAN_URL:  'https://etherscan.io/address/[ADDRESS]',
}
export const allContractOptions: IContractOptions[] = [mumbaiContractOptions, polygonContractOptions, mainNetContractOptions]
export function getEtherscanUrl(chain:IContractOptions, address:string){
  return chain.ETHERSCAN_URL.replace('[ADDRESS]',address)
}

export const getContractsFor = (chainId?: number): IContractOptions =>
  allContractOptions.find((opt: IContractOptions) => opt.CHAIN_ID === chainId) || mumbaiContractOptions
