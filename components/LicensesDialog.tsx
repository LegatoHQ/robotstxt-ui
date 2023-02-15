import React from 'react';

// @ts-ignore
import * as Dialog from '@radix-ui/react-dialog';

import { licensesOptions } from './WriteLicense';

export const CantBeEvilLicenseDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <div className="cursor-pointer underline underline-offset-4 dark:text-white/50">
        See all <span className="text-blue-500">CantBeEvil</span> licenses
      </div>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">CantBeEvil</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          There are six variants of the CantBeEvil license:
        </Dialog.Description>
        {licensesOptions.map(({ id, value }, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden p-2 text-left"
          >
            <a
              href={value}
              target="_blank"
              className="font-semibold underline"
              rel="noreferrer"
            >
              {id}
            </a>
          </div>
        ))}

        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            X
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
