import { useState } from 'react'

import cn from 'classnames'
import { isAddress } from 'ethers/lib/utils.js'
import { Verified } from 'lucide-react'
import { Collapse } from 'react-collapse'
import { ColorRing } from 'react-loader-spinner'
import { useContractRead, useNetwork } from 'wagmi'

import { getContractsFor } from '@/lib/actions/contractOptions'
import { RobotTxt__factory } from '@/lib/typechain-types'

function isLink(str: string) {
  try {
    new URL(str)
    return true
  } catch (e) {
    return false
  }
}

export const Read = () => {
  const { chain } = useNetwork()
  const contracts = getContractsFor(chain?.id)
  const [address, setAddress] = useState<string>('')

  const contractRead = useContractRead({
    address: contracts.ROBOTS_TXT,
    functionName: 'licenseOf',
    chainId: chain?.id,
    abi: RobotTxt__factory.abi,
    args: [address as `0x${string}`],
    enabled: isAddress(address),
  })

  const isFetchedAndEmpty = !contractRead.data && contractRead.isFetched
  const [licenseURI, licenseInfo] = contractRead.data || []

  return (
    <div className="flex w-full max-w-full flex-col gap-2 text-black dark:text-white">
      <div className="relative">
        <input
          placeholder="Enter a blockchain address to query"
          className="box-border w-full rounded-full border-2 border-solid border-[#9146FF] px-6 py-4 pr-12 shadow-xl  dark:bg-white/10 dark:text-white dark:placeholder:text-gray-600"
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
      {isFetchedAndEmpty && <div className="text-center text-orange-500">No license found for this address</div>}
      {address && !isAddress(address) && <div className="text-center text-purple-600">Does not look like a valid address</div>}
      <Collapse isOpened={Boolean(contractRead.isSuccess && contractRead.data)}>
        <div className="mt-4 flex w-full items-center gap-2 bg-black/10 p-4 text-left dark:bg-white/10">
          <Verified className={cn('inline-block text-green-500')} />
          <div>
            <div className="text-gray-600">License URI:</div>
            {isLink(licenseURI || '') ? (
              <>
                <a href={licenseURI} className="underline" target="_blank" rel="noreferrer">
                  {licenseURI}
                </a>
                <div className="text-gray-900 dark:text-white">{licenseInfo}</div>
              </>
            ) : (
              <>
                <div className="text-gray-900 dark:text-white">{licenseURI}</div>
                <div className="text-gray-900 dark:text-white">{licenseInfo}</div>
              </>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  )
}
