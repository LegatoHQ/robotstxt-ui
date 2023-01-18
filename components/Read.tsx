import { useState } from 'react'

import cn from 'classnames'
import { isAddress } from 'ethers/lib/utils.js'
import { Verified } from 'lucide-react'
import { Collapse } from 'react-collapse'
import { ColorRing } from 'react-loader-spinner'
import { useContractRead } from 'wagmi'

export const Read = () => {
  const [address, setAddress] = useState<string>('0x')

  const contractRead = useContractRead({
    address: '0xe74168069A4fD72b5732235b0E096c7a21E89b70',
    functionName: 'getDefaultLicense',
    chainId: 80001,
    abi: [
      {
        inputs: [{ internalType: 'address', name: 'address', type: 'address' }],
        name: 'getDefaultLicense',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        type: 'function',
        stateMutability: 'view',
      },
    ],
    args: [address as `0x${string}`],
    enabled: isAddress(address),
  })

  const isFetchedAndEmpty = !contractRead.data && contractRead.isFetched

  return (
    <div className="text-black dark:text-white">
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            placeholder="Enter a blockchain address to query"
            className="w-full rounded-full border-2 border-[#9146FF] px-6 py-4 shadow-xl  dark:bg-white/10 dark:text-white dark:placeholder:text-gray-100"
            onInput={(e) => setAddress(e.currentTarget.value)}
          />
          {contractRead.isLoading && (
            <div className="pointer-events-none absolute right-0 top-1/2 mr-2 -translate-y-1/2">
              <ColorRing
                visible={true}
                height="45"
                width="45"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />
            </div>
          )}
        </div>
        {isFetchedAndEmpty && <div className="text-orange-500">No license found for this address</div>}
        <Collapse isOpened={Boolean(contractRead.isSuccess && contractRead.data)}>
          <div className="mt-4 flex w-full items-center gap-2 p-4 text-left dark:bg-white/10">
            <Verified className={cn('inline-block text-green-500')} />
            <div>
              <div className="text-gray-500">License URI:</div>
              <div className="text-gray-900 dark:text-white">{contractRead.data}</div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  )
}
