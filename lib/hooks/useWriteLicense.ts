import { useState } from 'react'

import { BigNumber, BigNumberish } from 'ethers'
import { formatUnits, isAddress } from 'ethers/lib/utils.js'
import { config } from 'react-spring'
import { toast } from 'react-toastify'
import { useAccount, useBalance, useContractWrite, useFeeData, usePrepareContractWrite } from 'wagmi'

const formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 6,
})

const calcGasFee = (gasPrice: BigNumber, gasLimit: BigNumber) => {
  return gasPrice.mul(gasLimit)
}

export const useWriteLicense = (onSuccess?: () => void) => {
  const [address, setAddress] = useState<string>('')
  const [uri, setUri] = useState<string>('')

  const account = useAccount()
  const balance = useBalance({
    address: account.address,
  })

  const feeData = useFeeData()

  const prepareContract = usePrepareContractWrite({
    address: '0xe74168069A4fD72b5732235b0E096c7a21E89b70',
    functionName: 'setDefaultLicense',
    chainId: 80001,
    abi: [
      {
        inputs: [
          { internalType: 'address', name: 'address', type: 'address' },
          { internalType: 'string', name: 'uri', type: 'string' },
        ],
        name: 'setDefaultLicense',
        outputs: [],
        type: 'function',
        stateMutability: 'nonpayable',
      },
    ],
    args: [account.address as `0x${string}`, '1'],
    // enabled: Boolean(isAddress(address) && uri && feeData.isSuccess),F
  })

  const contractWrite = useContractWrite({
    ...prepareContract.config,
    onSuccess: () => {
      toast.success('License set successfully')
      setUri('')
      setAddress('')
      onSuccess && onSuccess()
    },
  })

  const gasFee = calcGasFee(feeData.data?.gasPrice || BigNumber.from(0), prepareContract.data?.request.gasLimit || BigNumber.from(0))
  const gasFeeDisplay = formatter.format(+formatUnits(gasFee, balance.data?.decimals || 18))
  const balanceDisplay = formatter.format(+formatUnits(balance.data?.value || BigNumber.from(0), balance.data?.decimals || 18))

  const hasEnoughBalanceToWrite = balance.data?.value?.gte(gasFee)
  return {
    address,
    setAddress,
    uri,
    setUri,
    contractWrite,
    prepareContract,
    balance,
    feeData,
    gasFeeDisplay,
    balanceDisplay,
    hasEnoughBalanceToWrite,
  }
}
