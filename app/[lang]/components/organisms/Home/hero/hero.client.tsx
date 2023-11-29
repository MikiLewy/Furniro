'use client';
import { useState } from 'react';

import { useResizeHandler } from '@/app/[lang]/hooks/use-resize-handler';

import Button from '../../../atoms/button/button';

interface Props {
  dictionary: { buyFurniture: string; buyAccessories: string };
}

const ClientHero = ({ dictionary }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useResizeHandler(1024, setIsMobile);

  const onClick = () => {
    // TODO: IMPLEMENT LOGIC WHEN PRODUCTS PAGE WILL BE READY
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button onClick={onClick} variant="contained" color="white" size={isMobile ? 'md' : 'lg'} className="mt-2 md:mt-4 lg:mt-6 self-start">
        {dictionary.buyFurniture}
      </Button>
      <Button onClick={onClick} variant="outlined" color="white" size={isMobile ? 'md' : 'lg'} className="mt-2 md:mt-4 lg:mt-6 self-start">
        {dictionary.buyAccessories}
      </Button>
    </div>
  );
};

export default ClientHero;
