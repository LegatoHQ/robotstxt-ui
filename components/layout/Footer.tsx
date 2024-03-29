import React from 'react'

import classNames from 'classnames'
import { FaGithub, FaTwitter } from 'react-icons/fa'

import { SITE_TITLE, SOCIAL_GITHUB, SOCIAL_TWITTER } from '@/lib/constants'

import { LinkComponent } from '../shared/LinkComponent'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const classes = classNames(props.className, 'Footer', 'px-4 py-6 flex flex-col justify-center items-center')

  return (
    <footer className={classes}>
      <h3>{SITE_TITLE}</h3>
      <a className="link my-2 text-xs" target={'_blank'} href="https://legatohq.com/" rel="noreferrer">
        Built by Legato Labs
      </a>
      <div className="mt-2 flex items-center">
        <LinkComponent href={`https://github.com/${SOCIAL_GITHUB}`}>
          <FaGithub />
        </LinkComponent>
        <div className="mx-2" />
        <LinkComponent href={`https://twitter.com/${SOCIAL_TWITTER}`}>
          <FaTwitter />
        </LinkComponent>
      </div>
    </footer>
  )
}
