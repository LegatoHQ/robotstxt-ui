/* eslint-disable tailwindcss/no-custom-classname */
// @ts-nocheck
import { useState } from 'react'

import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'
import { useContract, useContractWrite, usePrepareContractWrite } from 'wagmi'

import CodeExample from '@/components/CodeExample'
import { useDemoModal } from '@/components/home/demo-modal'
import { Head } from '@/components/layout/Head'
import { Read } from '@/components/Read'
import { ReadWriteToggle } from '@/components/ReadWriteToggle'
import { WriteLicense } from '@/components/WriteLicense'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/design'

import LicenseExplainer from './LicenseExplainer'

export default function Home() {
  const { DemoModal } = useDemoModal()
  const [active, setActive] = useState<'read' | 'write'>('read')

  return (
    <>
      <Head />
      <DemoModal />
      <div className="relative flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
          <motion.div
            className="max-w-3xl px-5 xl:px-0"
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
            {/* <h3 className="text-6xl font-normal">{SITE_EMOJI}</h3> */}
            <img src="/logo-fill.png" alt="Turbo ETH" className="mx-auto my-10 h-20 w-20" />
            <motion.h1
              className="font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl 
              font-bold tracking-[-0.02em] text-transparent 
              drop-shadow-sm dark:from-stone-100 dark:to-yellow-200 
              md:text-6xl md:leading-[6rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>Robots.xyz</Balancer>
            </motion.h1>
            <div className="flex flex-col gap-4">
              <ReadWriteToggle className="mx-auto" onChange={setActive} active={active} />
              {active === 'write' && <WriteLicense />}
              {active === 'read' && <Read />}
            </div>
            <motion.p className="mt-6 text-left text-gray-500 dark:text-gray-200 md:text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              {/* <Balancer className="text-xl">{SITE_DESCRIPTION}</Balancer> */}
              <Balancer className="text-xl">A robots.txt file tells search engine crawlers which URLs the crawler can access on your site.</Balancer>
              <Balancer className="py-3 text-xl">
                In web3, we can let aggregators and other companies know what they can and cannot do with our on-chain hosted contract and related
                images, music, and other content.
              </Balancer>
            </motion.p>
            <LicenseExplainer />
            <motion.div className="mx-auto mt-6 flex justify-center space-x-5 text-left" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <CodeExample />
            </motion.div>
          </motion.div>

          {/* <div className="">
            <motion.div
              className="my-10 grid w-full max-w-screen-2xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0"
              initial="hidden"
              whileInView="show"
              animate="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    delayChildren: 0.5,
                    staggerChildren: 0.15,
                  },
                },
              }}>
              {features.map(({ title, description, demo, large }) => (
                <Card key={title} title={title} description={description} demo={demo} large={large} />
              ))}
            </motion.div>
          </div> */}
        </div>
      </div>
    </>
  )
}
