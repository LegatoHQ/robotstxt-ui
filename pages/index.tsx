// @ts-nocheck
import { useState } from 'react'

import cn from 'classnames'
import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { Head } from '@/components/layout/Head'
import { CantBeEvilLicenseDialog } from '@/components/LicensesDialog'
import { Read } from '@/components/Read'
import { ReadWriteToggle } from '@/components/ReadWriteToggle'
import { WriteLicense } from '@/components/WriteLicense'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/design'

export default function Home() {
  const [active, setActive] = useState<'read' | 'write'>('read')
  return (
    <>
      <Head />
      <motion.div
        className="flex-center mx-auto flex w-full max-w-2xl flex-col gap-4 px-5"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}>
        <img src="/logo.svg" alt="Turbo ETH" className="mx-auto h-20 w-20" />
        <h1 className="mb-10 pb-2 text-center text-5xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-6xl">
          Robots.xyz
        </h1>
        <ReadWriteToggle className="mx-auto" onChange={setActive} active={active} />
        <div className={cn({ hidden: active !== 'write' }, 'w-full')}>
          <WriteLicense onSuccess={() => setActive('read')} />
        </div>
        <div className={cn({ hidden: active !== 'read' }, 'w-full')}>
          <Read />
        </div>
        <motion.p
          className="mt-6 flex w-full flex-col items-center gap-2 text-center text-gray-500 dark:text-gray-200 "
          variants={FADE_DOWN_ANIMATION_VARIANTS}>
          {/* <Balancer className="text-xl">{SITE_DESCRIPTION}</Balancer> */}
          <Balancer>A robots.txt file tells search engine crawlers which URLs the crawler can access on your site.</Balancer>
          <Balancer>
            In web3, we can let aggregators and other companies know what they can and cannot do with our on-chain hosted contract and related images,
            music, and other content.
          </Balancer>
          <CantBeEvilLicenseDialog />
        </motion.p>
      </motion.div>
    </>
  )
}
