import React from 'react'

import classNames from 'clsx'
import Image from 'next/image'

import { SITE_NAME } from '@/lib/constants'
import useScroll from '@/lib/hooks/useScroll'

import { getContractsFor } from '@/lib/actions/contractOptions'
import * as Dialog from '@radix-ui/react-dialog'
import { Oval } from 'react-loader-spinner'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { BranchColorMode } from '../branch/BranchColorMode'
import BranchIsWalletConnected from '../branch/BranchIsWalletConnected'
import ResponsiveMobileAndDesktop from '../responsive/ResponsiveMobileAndDesktop'
import { LinkComponent } from '../shared/LinkComponent'
import { ThemeSwitcher } from '../shared/ThemeSwitcher'
import { licensesOptions } from '../WriteLicense'
import UserDropdown from './UserDropdown'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const scrolled = useScroll(50)
  const classes = classNames(
    props.className,
    'Header',
    'fixed top-0 w-full',
    'px-6 lg:px-10 py-3 mb-8 flex items-center',
    {
      'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:bg-black/50 dark:border-gray-800': scrolled,
    },
    'z-30 transition-all'
  )

  const [showBalanceModal, setShowBalanceModal] = React.useState(false)

  const account = useAccount()
  const network = useNetwork()

  const balance = useBalance({
    address: account.address,
    token: getContractsFor(network.chain?.id).ROBOT_TOKEN as `0x${string}`,
    chainId: network.chain?.id,
  })

  return (
    <header className={classes}>
      <ResponsiveMobileAndDesktop>
        {/* <LinkComponent href="/" className="flex flex-1 items-center ">
          <BranchColorMode>
            <Image alt="Logo" src="/logo-dark.png" width={32} height={32} />
            <Image alt="Logo" src="/logo-white.png" width={32} height={32} />
          </BranchColorMode>
        </LinkComponent> */}
        <LinkComponent className="flex items-center" href="/">
          <BranchColorMode>
            <Image alt="Logo" src="/logo-dark.png" width={32} height={32} />
            <Image alt="Logo" src="/logo-white.png" width={32} height={32} />
          </BranchColorMode>
          <h1 className="text-gradient-sand ml-2 text-2xl font-bold">{SITE_NAME}</h1>
        </LinkComponent>
      </ResponsiveMobileAndDesktop>
      <div className="flex-1 items-start" />

      <div className="flex items-center gap-4">
        <BranchIsWalletConnected>
          <button className="flex gap-4 cursor-pointer" onClick={() => setShowBalanceModal(true)}>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <div title="🤖 Your robot token balance " className="flex font-semibold items-center gap-2 ">
                  {balance.isLoading ? (
                    <Oval
                      height={16}
                      width={16}
                      color="#4fa94d"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#4fa94d"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    <img src="/logo.svg" alt="Robots!" className="h-5 w-5" />
                  )}
                  {balance.data?.formatted && <span>{balance.data.formatted}</span>}
                </div>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent" style={{ maxWidth: 420 }}>
                  <div className="flex gap-2 items-center">
                    <img src="/logo.svg" alt="Robots!" className="inline-block h-6 w-6" />
                    <Dialog.Title className="text-xl">Your robot token balance</Dialog.Title>
                  </div>
                  <Dialog.Description className="DialogDescription">
                    Crypto tokens are digital representations of interest in an asset or used to facilitate transactions on a blockchain. They are
                    often confused with cryptocurrency because they are also tradeable and exchangeable.
                  </Dialog.Description>
                  <Dialog.Close asChild>
                    <button className="IconButton cursor-pointer" aria-label="Close">
                      X
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <UserDropdown />
          </button>
        </BranchIsWalletConnected>

        <ThemeSwitcher />
      </div>
    </header>
  )
}
