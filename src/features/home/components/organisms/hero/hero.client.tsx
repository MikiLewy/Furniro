'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const ClientHero = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(`/products`)}
      variant="secondary"
      size="lg">
      Shop now
    </Button>
  );
};

export default ClientHero;
