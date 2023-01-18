import { useState } from 'react'

import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxOptionText, ComboboxPopover } from '@reach/combobox'
import CreatableSelect from 'react-select/creatable'
import { useContractWrite } from 'wagmi'
import '@reach/combobox/styles.css'

const options = [
  { title: 'CC0 (“PUBLIC”)', value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/0' },
  {
    title: 'Exclusive Commercial Rights with No Creator Retention (“EXCLUSIVE”)',
    value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/1',
  },
  { title: 'Non-Exclusive Commercial Rights (“COMMERCIAL”)', value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/2' },
  {
    title: 'Non-Exclusive Commercial Rights with Creator Retention & Hate Speech Termination (“COMMERCIAL-NO-HATE”)',
    value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/3',
  },
  { title: 'Personal License (“PERSONAL”)', value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/4' },
  {
    title: 'Personal License with Hate Speech Termination (“PERSONAL-NO-HATE”)',
    value: 'https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/5',
  },
]

export const WriteLicense = () => {
  const [address, setAddress] = useState<string>('0x')
  const [uri, setUri] = useState<string>('')

  // const contractWritePrepared = usePrepareContractWrite({
  //   address: '0xe74168069A4fD72b5732235b0E096c7a21E89b70',
  //   functionName: 'setDefaultLicense',
  //   abi: ,
  // })
  // console.log('contractWritePrepared:', contractWritePrepared)

  const contractWrite = useContractWrite({
    mode: 'recklesslyUnprepared',
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
  })

  return (
    <div className="flex flex-col gap-4 text-black">
      <div className="flex flex-col gap-2">
        <input
          placeholder="Enter a blockchain address to query"
          className="w-full rounded-full border-2 border-[#9146FF] px-6 py-4 shadow-xl  dark:bg-white/10 dark:text-white dark:placeholder:text-gray-100"
          onInput={(e) => setAddress(e.currentTarget.value)}
        />
        <Combobox className="bg-transparent">
          <ComboboxInput
            className="w-full rounded-full border-2 border-[#9146FF] px-6 py-4 shadow-xl  dark:bg-white/10 dark:text-white dark:placeholder:text-gray-100"
            onChange={(e) => setUri(e.currentTarget.value)}
          />
          <ComboboxPopover portal={false} className="rounded-2xl border-none" style={{ background: 'transparent' }}>
            <ComboboxList className="rounded-2xl border-none dark:bg-white/10">
              {options.map(({ title, value }, index) => (
                <ComboboxOption key={index} value={value} className="rounded-2xl hover:bg-white/20">
                  <div className="font-roboto flex flex-col p-2 text-left">
                    <div className="font-semibold">{title}</div>
                    <div className="text-xs text-gray-500">{value}</div>
                  </div>
                </ComboboxOption>
              ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        <button
          className="w-min rounded-full bg-[#9146FF] px-12 py-4 font-semibold shadow-xl dark:text-white dark:placeholder:text-gray-100"
          onClick={() =>
            contractWrite.write?.({
              recklesslySetUnpreparedArgs: [address as `0x${string}`, uri],
            })
          }>
          Write
        </button>
      </div>
    </div>
  )
}
