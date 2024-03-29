import { WalletAddress } from '@turbo-eth/core-wagmi'
import { motion } from 'framer-motion'
import { LayoutDashboardIcon, NetworkIcon, Wallet } from 'lucide-react'
import Link from 'next/link'

import DashboardSidebar from '@/components/layout/DashboardSidebar'
import { Head } from '@/components/layout/Head'
import ButtonSIWELogout from '@/components/siwe/ButtonSIWELogout'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/design'

export default function SIWE() {
  return (
    <>
      <Head />
      <div className="flex-center container mx-auto flex flex-1 flex-col items-center justify-center">
        <motion.div
          className="grid w-full flex-1 grid-cols-12 gap-x-10"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}>
          <div className="bg-gradient-primary col-span-12 flex w-full flex-col rounded-lg p-6 shadow-lg lg:col-span-3">
            <h3 className="text-gradient-primary text-2xl font-bold">Wallet</h3>
            <hr className="my-5 dark:border-gray-200 dark:opacity-50" />
            <DashboardSidebar className="h-full flex-1" />
          </div>
          <div className="flex-center col-span-12 flex flex-col lg:col-span-9">
            <div className="text-center">
              <h3 className="font-primary text-2xl font-bold lg:text-6xl">
                <span className="text-gradient-secondary">Hello, Web3 User</span> 👋
              </h3>
              <WalletAddress className="mt-5 block text-xl font-light" />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
