import { FC } from 'react'

import cn from 'classnames'

interface Props {
  className?: string
  active: 'read' | 'write'
  // eslint-disable-next-line unused-imports/no-unused-vars
  onChange: (active: 'read' | 'write') => void
}
export const ReadWriteToggle: FC<Props> = ({ active, onChange, className }) => {
  return (
    <div className={cn('flex font-semibold dark:bg-white/10 w-min rounded-full p-[6px] shadow-xl', className)}>
      <button
        className={cn({ 'bg-[#9146FF]': active === 'read', 'text-white': active === 'read' }, 'py-[10px] px-[36px] rounded-full')}
        onClick={() => onChange('read')}>
        Read
      </button>
      <button
        className={cn({ 'bg-[#9146FF]': active === 'write', 'text-white': active === 'write' }, 'py-[10px] px-[36px] rounded-full')}
        onClick={() => onChange('write')}>
        Write
      </button>
    </div>
  )
}
