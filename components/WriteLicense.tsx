import { FC, useState } from 'react'

import '@reach/combobox/styles.css'
import cn from 'classnames'
import { CheckCheck, Fuel, FuelIcon, X } from 'lucide-react'
import Autosuggest from 'react-autosuggest'
import { ColorRing } from 'react-loader-spinner'

import { useWriteLicense } from '@/lib/hooks/useWriteLicense'

import { OwnerAlerts } from './OwnerAlerts'

export const licensesOptions = [
  { id: 'CC0 (“PUBLIC”)', value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/0' },
  {
    id: 'Exclusive Commercial Rights with No Creator Retention (“EXCLUSIVE”)',
    value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/1',
  },
  {
    id: 'Non-Exclusive Commercial Rights (“COMMERCIAL”)',
    value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/2',
  },
  {
    id: 'Non-Exclusive Commercial Rights with Creator Retention & Hate Speech Termination (“COMMERCIAL-NO-HATE”)',
    value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/3',
  },
  { id: 'Personal License (“PERSONAL”)', value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/4' },
  {
    id: 'Personal License with Hate Speech Termination (“PERSONAL-NO-HATE”)',
    value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/5',
  },
]

function escapeRegexCharacters(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getSuggestions(value: string) {
  const escapedValue = escapeRegexCharacters(value.trim())
  if (escapedValue === '') {
    return licensesOptions
  }
  const regex = new RegExp('^' + escapedValue, 'i')
  return licensesOptions.filter(({ id, value }) => regex.test(id + value))
}

export const WriteLicense: FC<{ onSuccess?: () => {} }> = ({ onSuccess }) => {
  const {
    address,
    setAddress,
    uri,
    setUri,
    info,
    setInfo,
    contractWrite,
    isOwner,
    ownerAddressRead,
    gasFeeDisplay,
    balance,
    balanceDisplay,
    hasEnoughBalanceToWrite,
    waitForTransaction,
  } = useWriteLicense(onSuccess)

  const [suggestions, setSuggestions] = useState<
    {
      id: string
      value: string
    }[]
  >(licensesOptions)

  const isLoading = contractWrite.isLoading || waitForTransaction.isLoading

  return (
    <div
      className={cn('flex w-full flex-col items-center gap-4 text-black', {
        'pointer-events-none': isLoading,
        'opacity-60': isLoading,
      })}>
      <div className="relative w-full">
        <input
          placeholder="Enter a blockchain address that you control as an owner."
          className="box-border w-full rounded-full  border-2 border-solid border-[#9146FF] px-6 py-4 shadow-xl  dark:bg-white/10 dark:text-white dark:placeholder:text-gray-600"
          value={address}
          onInput={(e) => {
            setAddress(e.currentTarget.value)
          }}
        />
        {ownerAddressRead.isLoading && (
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
      <OwnerAlerts
        isLoading={ownerAddressRead.isLoading}
        isIdle={ownerAddressRead.isIdle}
        isOwner={isOwner}
        isError={ownerAddressRead.isError}
        isSuccess={ownerAddressRead.isSuccess}
      />

      {ownerAddressRead.isError}
      <Autosuggest
        containerProps={{
          className: 'w-full relative',
        }}
        getSuggestionValue={(suggestion) => suggestion.id}
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
        onSuggestionsClearRequested={() => setSuggestions(licensesOptions)}
        shouldRenderSuggestions={() => true}
        onSuggestionSelected={(e, { suggestion }) => setUri(suggestion.value)}
        inputProps={{
          value: uri,
          onChange: (e, { newValue }) => setUri(newValue),
          placeholder: 'Select or enter a default license to attach to this address.',
          className:
            'box-border w-full rounded-full border-2 border-solid border-[#9146FF] px-6 py-4 shadow-xl  dark:bg-white/10 dark:text-white dark:placeholder:text-gray-600',
        }}
        renderSuggestion={(suggestion, { isHighlighted }) => (
          <div className={cn('flex flex-col gap-1 px-4 py-2', { 'bg-black/10 dark:bg-white/20': isHighlighted })}>
            <div className="text-sm font-semibold dark:text-white">{suggestion.id}</div>
            <div className="text-xs text-gray-500 dark:text-gray-600">{suggestion.value}</div>
          </div>
        )}
        renderSuggestionsContainer={({ containerProps, children }) => (
          <div
            {...containerProps}
            className="mt-1 w-full overflow-hidden rounded-lg bg-white shadow-xl dark:bg-black/90">
            {children}
          </div>
        )}
      />
      <input
        placeholder="Set a default info message to attach to this address."
        className="box-border w-full rounded-full  border-2 border-solid border-[#9146FF] px-6 py-4 shadow-xl  dark:bg-white/10 dark:text-white dark:placeholder:text-gray-600"
        value={info}
        onInput={(e) => {
          setInfo(e.currentTarget.value)
        }}
      />
      {contractWrite.isError && (
        <div className="text-center text-sm font-semibold text-red-500">{contractWrite.error?.message}</div>
      )}
      <button
        className={cn(
          'relative w-min cursor-pointer rounded-full bg-[#9146FF] px-12 py-4 font-semibold text-white shadow-xl dark:text-white dark:placeholder:text-gray-600',
          { 'opacity-50': isLoading || !uri || !address }
        )}
        disabled={isLoading || !uri || !address}
        onClick={() => {
          contractWrite.write?.({
            recklesslySetUnpreparedArgs: [address as `0x${string}`, uri, info],
          })
        }}>
        <div className={cn({ 'opacity-0': isLoading })}>Write</div>
        {isLoading && (
          <div className="pointer-events-none absolute left-1/2 top-1/2  mr-2 -translate-y-1/2 -translate-x-1/2">
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
      </button>
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">My balance</span>
          <div className={cn('text-sm font-semibold dark:text-white', { 'text-red-500 ': !hasEnoughBalanceToWrite })}>
            {balanceDisplay} {balance.data?.symbol}
          </div>
        </div>
        <span>•</span>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Gas Fee</span>
          <div className="text-sm font-semibold dark:text-white">
            {gasFeeDisplay} {balance.data?.symbol}
          </div>
        </div>
      </div>
    </div>
  )
}
