'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col  items-center justify-center gap-4 h-screen px-4">
      <h2 className="text-3xl lg:text-5xl text-center">
        Something went wrong!
      </h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
