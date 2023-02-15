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
  ROBOTS_TXT: '0x14D7c7873dFAbc3a565CEe439dbf7336398687CC',
  ROBOT_TOKEN: '0xB6ef53CE7A5cc4dDDaDA7B46e74d10837324E392',
}
export const polygonContractOptions: IContractOptions = {
  CHAIN_ID: 137,
  RPC: 'https://polygon-mainnet.infura.io/v3/855f45a706ee4f5d8127b569538010d3',
  ROBOTS_TXT: '0xbe2Fbb7F51A4966bD36BB41BBBe2CA931c5D07e6',
  ROBOT_TOKEN: '0x034e8e3388bf9a8a6379a41926d41c4265198e55',
}
export const mainNetContractOptions: IContractOptions = {
  CHAIN_ID: 1,
  RPC: 'https://eth.llamarpc.co',
  ROBOTS_TXT: '0x53F63a626B7218aDbDf71e87Fbd83C339feBa6e6',
  ROBOT_TOKEN: '0x9D174aAB6ca9d0Aa07aEefab23cF52dF6F337Fa8',
}
export const allContractOptions: IContractOptions[] = [mumbaiContractOptions, polygonContractOptions, mainNetContractOptions]

export const getContractsFor = (chainId?: number): IContractOptions =>
  allContractOptions.find((opt: IContractOptions) => opt.CHAIN_ID === chainId) || mumbaiContractOptions
