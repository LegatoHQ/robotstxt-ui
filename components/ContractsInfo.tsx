import React from 'react'

import { getContractsFor, getEtherscanUrl } from '@/lib/actions/contractOptions'
import { useNetwork } from 'wagmi'

export const ContractsInfo = () => {
  const network = useNetwork()
  const { chain } = network
  const contracts = getContractsFor(chain?.id)
  return (
    <div className='text-sm grid gap-1 font-mono '>
      Contracts
      <a
      href={getEtherscanUrl(contracts,contracts.ROBOTS_TXT)}
      target="_blank"
      rel="noreferrer"
       className="flex gap-2 hover:underline hover:text-indigo-600">
        <div className="uppercase">Robots.txt:</div>
        <div>{contracts.ROBOTS_TXT}</div>
      </a>
      <a
      href={getEtherscanUrl(contracts,contracts.ROBOT_TOKEN)}
      target="_blank"
      rel="noreferrer"
       className="flex gap-2 hover:underline hover:text-indigo-600">
        <div className="uppercase">Robot token:</div>
        <div>{contracts.ROBOT_TOKEN}</div>
      </a>
      {/* <div className="flex gap-2 text-sm">
        <div className="uppercase">RPC:</div>
        <div>{chain?.rpcUrls.default.http}</div>
      </div> */}
    </div>
  )
}
