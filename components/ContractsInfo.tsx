import React from 'react'

import { getContractsFor } from '@/lib/actions/contractOptions'
import { useNetwork } from 'wagmi'


export const ContractsInfo = ()=> {
  const network = useNetwork()
  const { chain } = network
  const contracts = getContractsFor(chain?.id)
  return (
    <div>
      Contracts
      <div className='flex gap-2'>
        <div className='uppercase'>Robots.txt:</div>
        <div>{contracts.ROBOTS_TXT}</div>
      </div>
      <div className='flex gap-2'>
        <div className='uppercase'>Robot token:</div>
        <div>{contracts.ROBOT_TOKEN}</div>
      </div>
    </div>
  )
}
