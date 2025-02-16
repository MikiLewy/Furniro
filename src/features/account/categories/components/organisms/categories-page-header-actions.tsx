'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDialog } from '@/hooks/use-dialog';
import { Can } from '@/permissions/can';

import CreateCategoryDialog from './dialogs/create-category-dialog';

const CategoriesPageHeaderActions = () => {
  const [
    isOpenCreateCategoryDialog,
    handleOpenCreateCategoryDialog,
    handleCloseCreateCategoryDialog,
  ] = useDialog();

  return (
    <>
      <div className="ml-auto">
        <Can I="create" a="AccountCategories" passThrough>
          {allowed => (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={0} className="w-full">
                    <Button
                      disabled={!allowed}
                      onClick={handleOpenCreateCategoryDialog}>
                      <Plus className="mr h-4 w-4" />
                      Create category
                    </Button>
                  </span>
                </TooltipTrigger>
                {!allowed ? (
                  <TooltipContent>
                    <p>Not sufficient permissions</p>
                  </TooltipContent>
                ) : null}
              </Tooltip>
            </TooltipProvider>
          )}
        </Can>
      </div>
      <CreateCategoryDialog
        open={isOpenCreateCategoryDialog}
        onClose={handleCloseCreateCategoryDialog}
      />
    </>
  );
};

export default CategoriesPageHeaderActions;
