'use client';
import { useRouter } from 'nextjs-toploader/app';

import { Button } from '@/components/ui/button';

const ClientHero = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(`/collections/all`)}
      variant="secondary"
      size="lg">
      Shop now
    </Button>
  );
};

export default ClientHero;
