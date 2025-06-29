'use client';
import { useEffect, useState } from 'react';

export default function ExploreLoading() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;  // Or a minimal SSR-safe placeholder
  }

  return (
    <div style={styles.container}>
      <div className='spinner'></div>
    </div>
  );
}


const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
};
