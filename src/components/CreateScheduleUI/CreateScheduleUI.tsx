import { DaysOfTheWeek } from '../../utils/categories';
import { useState } from 'react';

export interface CreateScheduleUIProps {
  onAddInterval: () => void;
  onRemoveInterval: (index: number) => void;
  onSetSchedule: (schedule: {
    timeIntervals: { start: string; end: string }[];
    selectedDays: (typeof DaysOfTheWeek)[];
  }) => void;
  onRemoveSchedule: () => void;
}

const CreateScheduleUI = ({
  onAddInterval,
  onRemoveInterval,
  onSetSchedule,
  onRemoveSchedule,
}: CreateScheduleUIProps) => {
  const [selectedDays, setSelectedDays] = useState<(typeof DaysOfTheWeek)[]>(
    []
  );
  const [timeIntervals, setTimeIntervals] = useState([
    { start: '09:00', end: '17:00' },
  ]);

  const toggleDay = (selectedDay: typeof DaysOfTheWeek) => {
    if (selectedDays.includes(selectedDay)) {
      setSelectedDays((prev) => prev.filter((day) => day !== selectedDay));
    } else {
      setSelectedDays((prev) => [...prev, selectedDay]);
    }
  };

  const handleAddInterval = () => {
    setTimeIntervals((prev) => [...prev, { start: '', end: '' }]);
    if (onAddInterval) onAddInterval();
  };

  const handleRemoveInterval = (index: number) => {
    setTimeIntervals((prev) => prev.filter((_, i) => i !== index));
    if (onRemoveInterval) onRemoveInterval(index);
  };

  const handleSetTime = (
    index: number,
    field: 'start' | 'end',
    value: string
  ) => {
    const updatedIntervals = [...timeIntervals];
    updatedIntervals[index][field] = value;
    setTimeIntervals(updatedIntervals);
  };

  return (
    <div className="p-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Set up blocking schedule</h2>
      <div className="space-y-4">
        <h3 className="text-md font-semibold">Set Times</h3>
        {timeIntervals.map((interval, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className="relative">
              {/* <Clock className="absolute left-2 top-2 text-gray-400" size={18} /> */}
              <input
                type="time"
                className="input input-bordered pl-8 w-32"
                value={interval.start}
                onChange={(e) => handleSetTime(index, 'start', e.target.value)}
              />
            </div>
            <span>to</span>
            <div className="relative">
              {/* <Clock className="absolute left-2 top-2 text-gray-400" size={18} /> */}
              <input
                type="time"
                className="input input-bordered pl-8 w-32"
                value={interval.end}
                onChange={(e) => handleSetTime(index, 'end', e.target.value)}
              />
            </div>
            <button
              className="bg-red-400 hover:bg-red-500 text-white"
              onClick={() => handleRemoveInterval(index)}
            >
              -
            </button>
          </div>
        ))}
        <button
          className="bg-gray-200 hover:bg-gray-300"
          onClick={handleAddInterval}
        >
          Add interval
        </button>

        <h3 className="text-md font-semibold mt-4">
          Selected Days (Click a day to deactivate)
        </h3>
        <div className="flex gap-2">
          {Object.values(DaysOfTheWeek).map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition
                  ${selectedDays.includes(day) ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateScheduleUI;
