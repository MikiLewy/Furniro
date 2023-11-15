'use client';
import { useState } from 'react';

import { useResizeHandler } from '@/app/[lang]/hooks/use-resize-handler';

import Button from '../../../atoms/button/button';

interface Props {
  content: string;
}

const ClientHero = ({ content }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useResizeHandler(1024, setIsMobile);

  const onClick = () => {
    // TODO: IMPLEMENT LOGIC WHEN PRODUCTS PAGE WILL BE READY
  };

  return (
    <Button onClick={onClick} variant="contained" size={isMobile ? 'md' : 'lg'} className="mt-2 md:mt-4 lg:mt-6 self-start">
      {content}
    </Button>
  );
};

export default ClientHero;
