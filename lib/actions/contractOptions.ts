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
  ROBOTS_TXT: '0x65a4b530A8A456f7b372Db49cd3e1Fa0AF36bA5A',
  ROBOT_TOKEN: '0x1451c783CecbEc3dFee498CD49E40C61f4337eE3',
}
export const mainNetContractOptions: IContractOptions = {
  CHAIN_ID: 1,
  RPC: 'https://mainnet.infura.io/v3/c97ed77531d74d5287facb6404446a0b',
  ROBOTS_TXT: '0x53F63a626B7218aDbDf71e87Fbd83C339feBa6e6',
  ROBOT_TOKEN: '0x9D174aAB6ca9d0Aa07aEefab23cF52dF6F337Fa8',
}
export const allContractOptions: IContractOptions[] = [mumbaiContractOptions, polygonContractOptions, mainNetContractOptions]

export const getContractsFor = (chainId?: number): IContractOptions =>
  allContractOptions.find((opt: IContractOptions) => opt.CHAIN_ID === chainId) || mumbaiContractOptions
