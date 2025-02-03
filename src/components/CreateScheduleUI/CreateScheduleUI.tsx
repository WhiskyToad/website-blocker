import { DaysOfTheWeek } from '../../utils/categories';
import { useState } from 'react';
import BaseSelect from '../BaseSelect/BaseSelect';
import { IoMdRemoveCircleOutline } from 'react-icons/io';

export interface CreateScheduleUIProps {
  onAddInterval: () => void;
  onRemoveInterval: (index: number) => void;
}

export const TIME_OPTIONS = Array.from({ length: 24 * 4 }, (_, i) => {
  const hours = String(Math.floor(i / 4)).padStart(2, '0');
  const minutes = String((i % 4) * 15).padStart(2, '0');
  return { value: `${hours}:${minutes}`, label: `${hours}:${minutes}` };
});

//TODO - add an always on toggle and then disable form
const CreateScheduleUI = ({
  onAddInterval,
  onRemoveInterval,
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
    <div className="w-full max-w-md">
      <h4 className="text-x font-bold mb-4">Set up blocking schedule</h4>
      <div className="space-y-4">
        <p className="text-md font-semibold">Set Times</p>
        {timeIntervals.map((interval, index) => (
          <div key={index} className="flex gap-2 align-baseline">
            <BaseSelect
              options={TIME_OPTIONS}
              value={interval.start}
              onChange={(value) => handleSetTime(index, 'start', value)}
              label="Start"
              placeholder="Select Start Time"
            />
            <BaseSelect
              options={TIME_OPTIONS}
              value={interval.end}
              onChange={(value) => handleSetTime(index, 'end', value)}
              label="End"
              placeholder="Select End Time"
            />
            <button
              className="mt-11"
              onClick={() => handleRemoveInterval(index)}
            >
              <IoMdRemoveCircleOutline size={24} color="red" />
            </button>
          </div>
        ))}
        <button
          className="btn btn-secondary w-full"
          onClick={handleAddInterval}
        >
          Add interval
        </button>

        <h3 className="text-md font-semibold mt-4">
          Selected Days (Click a day to deactivate)
        </h3>
        <div className="flex gap-2 w-full justify-between">
          {Object.values(DaysOfTheWeek).map((day) => (
            <div className="tooltip" key={day} data-tip={day}>
              <button
                onClick={() => toggleDay(day)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition
                  ${selectedDays.includes(day) ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                {day.at(0)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateScheduleUI;
