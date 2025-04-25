'use client';

import { useState, useEffect } from 'react';

export default function UltraProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showWarning, setShowWarning] = useState(false);

  // Define the restricted zone, using the window size with some padding
  const padding = 100; // Set the padding you want around the restricted area
  const restrictedZone = {
    top: padding,
    // left: padding,
    width: window.innerWidth - padding * 2,
    height: window.innerHeight - padding * 2,
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    // Check if the cursor is inside or outside the restricted zone
    if (
      clientX < restrictedZone.left ||
      clientX > restrictedZone.left + restrictedZone.width ||
      clientY < restrictedZone.top ||
      clientY > restrictedZone.top + restrictedZone.height
    ) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  useEffect(() => {
    // Add mouse move listener to detect cursor position
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      // Clean up the listener when the component is unmounted
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCloseModal = () => {
    setShowWarning(false);
  };

  return (
    <div>
      {/* Display warning modal if cursor is outside the restricted zone */}
      {showWarning && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h2>Warning!</h2>
            <p>You are moving outside the allowed area!
               
            </p>
            <button onClick={handleCloseModal} style={{ marginTop: '10px' ,color:'white',backgroundColor:'red',padding:'10px 20px',borderRadius:'5px'}}>
              Can Be Marked As Cheated
            </button>
          </div>
        </div>
      )}

      {/* Your layout content */}
      {children}
    </div>
  );
}
