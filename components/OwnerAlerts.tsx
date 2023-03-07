import { FC } from 'react'

import { CheckCheck, X } from 'lucide-react'

export const OwnerAlerts: FC<{ isIdle: boolean; isLoading: boolean; isSuccess: boolean; isError: boolean; isOwner: boolean }> = ({
  isError,
  isIdle,
  isSuccess,
  isOwner,
  isLoading,
}) => {
  if (isIdle || isLoading) return null

  if (isError)
    return (
      <div className="flex flex-col items-center gap-2 dark:text-white">
          <div className="text-red-500">
            <X size={24} />
          </div>
        <div className="grid items-center gap-2">
          <div className="text-sm font-semibold">Something went wrong.</div>
          <div className="text-sm font-semibold">Did you connect your wallet? (bottom right) </div>
          <div className="text-sm font-semibold">If so, are you on the right network? (bottom , second from the right)</div>
          <a
            target={'_blank'}
            href="https://docs.robots-txt.xyz/how-to-use/something-went-wrong"
            className="text-sm font-semibold text-blue-400 underline">
            or seek help
          </a>
        </div>
      </div>
    )

  if (isSuccess && isOwner)
    return (
      <div className="flex flex-col items-center gap-2 dark:text-white">
        <div className="flex items-center gap-2">
          <div className="text-green-500">
            <CheckCheck size={24} />
          </div>
          <div className="text-sm font-semibold">You&apos;re the owner of this address</div>
        </div>
      </div>
    )

  return (
    <div className="flex flex-col items-center gap-2 dark:text-white">
      <div className="flex items-center gap-2">
        <div className="text-red-500">
          <X size={24} />
        </div>
        <div className="text-sm font-semibold">You&apos;re not the owner of this address</div>
      </div>
    </div>
  )
}
