'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center text-center">
      <div className="mb-16">
        <span className="bg-gradient-to-b from-white to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
          404
        </span>
        <h2 className="font-heading my-2 text-2xl font-bold text-neutral-200">
          Something&apos;s missing
        </h2>
        <p className='text-neutral-400 max-w-screen-md'>
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="mt-10 flex justify-center gap-2">
          <Button onClick={() => router.back()} size="lg" className='bg-neutral-950 text-white hover:bg-neutral-800'>
            Go back
          </Button>
          <Button
            onClick={() => router.push('/dashboard')}
            size="lg"
            className='bg-white text-neutral-950 hover:bg-neutral-200'
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
