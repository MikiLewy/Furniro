'use client';

import { ReactNode } from 'react';

import {
  Dialog as DialogUi,
  DialogDescription,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '../ui/button';
import { LoadingButton } from '../atoms/loading-button';

export interface DialogActions {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

interface Props extends DialogActions {
  children?: ReactNode;
  title: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isSubmitButtonDisabled?: boolean;
  isSubmitButtonLoading?: boolean;
}

const Dialog = ({
  children,
  open,
  onClose,
  onSubmit,
  title,
  description,
  cancelButtonText,
  confirmButtonText,
  isSubmitButtonDisabled,
  isSubmitButtonLoading,
}: Props) => {
  return (
    <DialogUi open={open} onOpenChange={onClose} defaultOpen={open} modal>
      <DialogContent aria-describedby={description}>
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>

        {children}
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              {cancelButtonText ? cancelButtonText : 'Cancel'}
            </Button>
          </DialogClose>
          <LoadingButton
            disabled={isSubmitButtonDisabled}
            loading={isSubmitButtonLoading}
            onClick={onSubmit}>
            {confirmButtonText ? confirmButtonText : 'Confirm'}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </DialogUi>
  );
};

export default Dialog;
