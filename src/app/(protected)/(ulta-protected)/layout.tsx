'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function UltraProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showWarning, setShowWarning] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const restrictedZoneRef = useRef({ top: 0, left: 0, width: 0, height: 0 });
  const router = useRouter(); // For redirecting

  const padding = 100;

  const updateRestrictedZone = () => {
    restrictedZoneRef.current = {
      top: padding,
      left: padding,
      width: window.innerWidth - padding * 2,
      height: window.innerHeight - padding * 2,
    };
  };

  useEffect(() => {
    updateRestrictedZone();
    window.addEventListener('resize', updateRestrictedZone);
    return () => window.removeEventListener('resize', updateRestrictedZone);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { top, left, width, height } = restrictedZoneRef.current;

    const isOutside =
      clientX < left ||
      clientX > left + width ||
      clientY < top ||
      clientY > top + height;

    if (isOutside) {
      setShowWarning(true);
      setWarningCount((prev) => {
        const next = prev + 1;

        // 🚨 Auto-exit logic after 200 violations
        if (next >= 100) {
          console.warn('Exceeded 200 violations. Auto-submitting.');
          // Redirect or trigger auto-submit
          router.push('/submit?reason=cheating'); // <-- Customize as needed
        }

        return next;
      });
    } else {
      setShowWarning(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCloseModal = () => {
    setShowWarning(false);
  };

  return (
    <div>
      {showWarning && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: 'white',
                padding: '24px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h2 className="text-lg font-semibold">Warning!</h2>
              <p className="mt-2">
                Your mouse moved outside the allowed area.
              </p>
              <p className="text-sm text-red-600 font-bold mt-1">
               The quiz will neither be submitted nor saved if you continue to move outside the designated area.
              </p>
              <button
                onClick={handleCloseModal}
                style={{
                  marginTop: '15px',
                  backgroundColor: 'red',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                }}
              >
                Okay, I Understand
              </button>
            </div>
          </div>

          {/* Optional: Show target center */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              width: '10px',
              height: '10px',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10000,
            }}
          />
        </>
      )}

      {children}
    </div>
  );
}
