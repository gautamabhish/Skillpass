'use client';

import React from 'react';

type SwitchProps = {
  checked: boolean;
  onChange: () => void;
};

const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${
        checked ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default Switch;
