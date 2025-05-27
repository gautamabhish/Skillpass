'use client';
import React from 'react';
import Switch from '../ui/globals/Switch';
import { useCourseCreate } from '@/Providers/CreateProvider';

const TimeConfiguration = () => {
  const { courseData, setCourseData } = useCourseCreate();
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const [hours, setHours] = React.useState<string>('0');
  const [minutes, setMinutes] = React.useState<string>('0');

  // Update TimePerQuestion separately
  React.useEffect(() => {
    setCourseData((prev) => ({
      ...prev,
      TimePerQuestion: enabled,
    }));
  }, [enabled]);

  // Update duration in minutes
  React.useEffect(() => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    setCourseData((prev) => ({
      ...prev,
      duration: h * 60 + m,
    }));
  }, [hours, minutes]);

  const handleDurationChange = (field: 'hours' | 'minutes', value: string) => {
    if (!/^\d*$/.test(value)) return;

    const sanitized = value.replace(/^0+(?=\d)/, '') || '0';

    if (field === 'minutes') {
      const num = parseInt(sanitized, 10);
      if (num > 59) return;
      setMinutes(sanitized);
    } else {
      setHours(sanitized);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-6">
      <div className="text-gray-900 text-2xl font-bold">Time Configuration</div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Duration Inputs */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">
            Duration <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-500 mb-1">HH</span>
              <input
                type="text"
                maxLength={2}
                value={hours}
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
                value={minutes}
                onChange={(e) => handleDurationChange('minutes', e.target.value)}
                placeholder="00"
                className="w-16 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-center"
              />
              {parseInt(minutes || '0') > 59 && (
                <p className="text-red-500 text-xs mt-1">Minutes must be 0–59</p>
              )}
            </div>
          </div>
        </div>

        {/* Time Per Question Switch */}
        <div className="flex flex-col justify-start gap-1">
          <p className="text-gray-700 font-medium">Time Per Question</p>
          <Switch checked={enabled} onChange={() => setEnabled((prev) => !prev)} />
          <p className="text-xs text-gray-500 mt-1">
            {enabled
              ? 'Each question will get equal time based on total duration.'
              : 'Total duration will apply to the whole test.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeConfiguration;
