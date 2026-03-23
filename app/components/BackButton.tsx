'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="text-black hover:text-black/60 transition-colors text-base font-medium focus:outline-none focus:underline focus:underline-offset-4"
    >
      ← Back
    </button>
  );
}
