'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center bg-white dark:bg-neutral-950">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold text-neutral-800 dark:text-neutral-200">
        Something&apos;s missing
      </h2>
      <p className='text-muted-foreground dark:text-neutral-400'>
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className="mt-10 flex justify-center gap-2">
        <Button onClick={() => router.back()} variant="default" size="lg">
          Go back
        </Button>
        <Button
          onClick={() => router.push('/dashboard')}
          variant="ghost"
          size="lg"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
