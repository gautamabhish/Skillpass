import React, { useEffect } from 'react';

interface ModalProps {
  title?: string;
  message: string[];
  onClose: () => void;
}

const AlertModal: React.FC<ModalProps> = ({
  title = "Missing Required Fields",
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      inset: '0',
      zIndex: 50,
      backgroundColor: 'rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      paddingTop: '1rem',
      paddingRight: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        width: '100%',
        maxWidth: '24rem',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Progress Bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '4px',
          backgroundColor: '#2563eb', // blue-600
          width: '100%',
          animation: 'shrinkBar 5s linear forwards'
        }} />

        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#dc2626', // red-600
          marginBottom: '1rem'
        }}>{title}</h2>

        <ul style={{ paddingLeft: '1.25rem', color: '#374151', fontSize: '0.875rem', marginBottom: '1rem' }}>
          {message.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>

        <div style={{ textAlign: 'right' }}>
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#2563eb', // blue-600
              color: 'white',
              borderRadius: '0.375rem',
              transition: 'background-color 1s ease'
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {/* Keyframe animation inside a style tag */}
        <style>
          {`
            @keyframes shrinkBar {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default AlertModal;
