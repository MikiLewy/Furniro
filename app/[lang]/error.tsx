'use client';
import Button from '@/components/atoms/button/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col  items-center justify-center gap-4 h-screen">
      <h2 className="text-5xl">Something went wrong!</h2>
      <Button variant="contained" className="mt-3" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
