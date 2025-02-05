'use client';

import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDialog } from '@/hooks/use-dialog';

import CreateReviewDialog from '../../../organisms/dialogs/create-review-dialog';

const ClientReviewsCard = () => {
  const user = useSession()?.data?.user;

  const [
    isOpenCreateReviewDialog,
    handleOpenCreateReviewDialog,
    handleCloseCreateReviewDialog,
  ] = useDialog();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0} className="w-full">
              <Button
                variant="outline"
                className="w-full"
                disabled={!user}
                onClick={handleOpenCreateReviewDialog}>
                Add review
              </Button>
            </span>
          </TooltipTrigger>
          {!user ? (
            <TooltipContent>
              <p>You must be logged in to add a review</p>
            </TooltipContent>
          ) : null}
        </Tooltip>
      </TooltipProvider>
      <CreateReviewDialog
        open={isOpenCreateReviewDialog}
        onClose={handleCloseCreateReviewDialog}
      />
    </>
  );
};

export default ClientReviewsCard;
