'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useResizeHandler } from '@/hooks/use-resize-handler';
import { Locale } from '@/i18n.config';

import Button from '../../../atoms/button/button';

interface Props {
  dictionary: { buyFurniture: string; buyAccessories: string };
  lang: Locale;
}

const ClientHero = ({ dictionary, lang }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useResizeHandler(1024, setIsMobile);

  const onClick = () => {
    // TODO: IMPLEMENT LOGIC WHEN PRODUCTS PAGE WILL BE READY
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        onClick={() => router.push(`/${lang}/products`)}
        variant="contained"
        color="white"
        size={isMobile ? 'md' : 'lg'}
        className="mt-2 md:mt-4 lg:mt-6 self-start">
        {dictionary.buyFurniture}
      </Button>
      <Button onClick={onClick} variant="outlined" color="white" size={isMobile ? 'md' : 'lg'} className="mt-2 md:mt-4 lg:mt-6 self-start">
        {dictionary.buyAccessories}
      </Button>
    </div>
  );
};

export default ClientHero;
