import { FC } from 'react';

import cn from 'classnames';

interface Props {
  className?: string;
  active: 'read' | 'write';
  // eslint-disable-next-line unused-imports/no-unused-vars
  onChange: (active: 'read' | 'write') => void;
}
export const ReadWriteToggle: FC<Props> = ({ active, onChange, className }) => {
  return (
    <div
      className={cn(
        'flex w-min rounded-full p-[6px] font-semibold shadow-xl dark:bg-white/10',
        className
      )}
    >
      <button
        className={cn(
          {
            'bg-[#9146FF]': active === 'read',
            'text-white': active === 'read',
          },
          'rounded-full py-[10px] px-[36px]'
        )}
        onClick={() => onChange('read')}
      >
        Read
      </button>
      <button
        className={cn(
          {
            'bg-[#9146FF]': active === 'write',
            'text-white': active === 'write',
          },
          'rounded-full py-[10px] px-[36px]'
        )}
        onClick={() => onChange('write')}
      >
        Write
      </button>
    </div>
  );
};
