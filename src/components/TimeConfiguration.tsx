'use client';
import React from 'react';
import Switch from './ui/Switch';

const TimeConfiguration = () => {
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const [duration, setDuration] = React.useState({ hours: '', minutes: '' });

  const handleDurationChange = (field: 'hours' | 'minutes', value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    setDuration((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-6">
      <div className="text-gray-900 text-2xl font-bold">Time Configuration</div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Duration Input */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Duration</label>
          <div className="flex gap-4">
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-500 mb-1">HH</span>
              <input
                type="text"
                maxLength={2}
                value={duration.hours}
                onChange={(e) => handleDurationChange('hours', e.target.value)}
                placeholder="00"
                className="w-16 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-center"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-500 mb-1">MM</span>
              <input
                type="text"
                maxLength={2}
                value={duration.minutes}
                onChange={(e) => handleDurationChange('minutes', e.target.value)}
                placeholder="00"
                className="w-16 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-center"
              />
            </div>
          </div>
        </div>

        {/* Switch */}
        <div className="flex flex-col justify-start gap-1">
          <p className="text-gray-700 font-medium ">Time Per Question</p>
          <Switch
            checked={enabled}
            onChange={() => setEnabled((prev)=>!prev)}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeConfiguration;
