'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useResizeHandler } from '../../../../../hooks/use-resize-handler';

const ClientHero = () => {
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useResizeHandler(1024, setIsMobile);

  const onClick = () => {
    // TODO: IMPLEMENT LOGIC WHEN PRODUCTS PAGE WILL BE READY
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        onClick={() => router.push(`/products`)}
        color="white"
        className="mt-2 md:mt-4 lg:mt-6 self-start">
        Shop furniture
      </Button>
      <Button
        onClick={onClick}
        color="white"
        className="mt-2 md:mt-4 lg:mt-6 self-start">
        Shop accessories
      </Button>
    </div>
  );
};

export default ClientHero;
