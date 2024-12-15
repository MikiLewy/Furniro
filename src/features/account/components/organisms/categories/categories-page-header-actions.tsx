'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

const CategoriesPageHeaderActions = () => {
  return (
    <>
      <Button>
        <Plus className="mr h-4 w-4" />
        Create category
      </Button>
    </>
  );
};

export default CategoriesPageHeaderActions;
