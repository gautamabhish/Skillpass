'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UltraProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        alert('System Recognizes an attempt to cheat.');
        router.push('/unfinished');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [router]);

  return <div>{children}</div>;
}
