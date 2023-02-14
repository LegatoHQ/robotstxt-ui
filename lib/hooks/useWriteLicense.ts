import { useState } from 'react'

import { ToastDescription } from '@radix-ui/react-toast'
import { BigNumber, BigNumberish } from 'ethers'
import { formatUnits, isAddress } from 'ethers/lib/utils.js'
import { config } from 'react-spring'
import { toast } from 'react-toastify'
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useQueryClient,
  useWaitForTransaction,
} from 'wagmi'

import { getContractsFor } from '../actions/contractOptions'
import { RobotTxt, RobotTxt__factory } from '../typechain-types'

const formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 6,
})

const calcGasFee = (gasPrice: BigNumber, gasLimit: BigNumber) => {
  return gasPrice.mul(gasLimit)
}

export const useWriteLicense = (onSuccess?: () => void) => {
  const [address, setAddress] = useState<string>('')
  const [uri, setUri] = useState<string>('')
  const [info, setInfo] = useState<string>('')

  const account = useAccount()
  const balance = useBalance({
    address: account.address,
  })

  const feeData = useFeeData()

  const { chain } = useNetwork()
  const contracts = getContractsFor(chain?.id)
  // const robotContract = RobotTxt__factory.connect(contracts.ROBOTS_TXT, window.ethereum as any);
  const ownerAddressRead = useContractRead({
    address: address,
    functionName: 'owner',
    chainId: chain?.id,
    abi: RobotTxt__factory.abi,
    enabled: isAddress(address),
  })

  const isOwner = ownerAddressRead.data?.toLowerCase() === account.address?.toLowerCase()

  const prepareContract = usePrepareContractWrite({
    address: contracts.ROBOTS_TXT,
    functionName: 'setDefaultLicense',
    chainId: chain?.id,
    // abi:RobotTxt__factory.abi,
    abi: [
      {
        inputs: [
          { internalType: 'address', name: '_for', type: 'address' },
          { internalType: 'string', name: '_licenseUri', type: 'string' },
          { internalType: 'string', name: '_info', type: 'string' },
        ],
        name: 'setDefaultLicense',
        outputs: [],
        type: 'function',
        stateMutability: 'nonpayable',
      },
    ],
    args: [address as `0x${string}`, uri, info],
    enabled: Boolean(isAddress(address) && uri && info && feeData.isSuccess),
  })

  const contractWrite = useContractWrite({
    ...prepareContract.config,
    onError: (error: Error) => {
      toast.error(error.message)
    },
    onSettled: () => {},
    onSuccess: () => {
      toast.info('Setting License...')
    },
  })

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    onSuccess: () => {
      toast.success('License set') // setUri('');
      setAddress('')
      setUri('')
      setInfo('')
      onSuccess && onSuccess()
    },
    onError: (error: Error) => {
      console.error(error)
      toast.error(error.message)
    },
    confirmations: 1,
    chainId: chain?.id,
    enabled: Boolean(contractWrite.data?.hash),
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
    info,
    setInfo,
    contractWrite,
    prepareContract,
    balance,
    feeData,
    gasFeeDisplay,
    balanceDisplay,
    hasEnoughBalanceToWrite,
    ownerAddressRead,
    isOwner,
    waitForTransaction,
  }
}
