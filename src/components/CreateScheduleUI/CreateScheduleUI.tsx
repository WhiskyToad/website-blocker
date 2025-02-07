import { IoMdRemoveCircleOutline } from 'react-icons/io';
import BaseSelect from '../BaseSelect/BaseSelect';
import {
  daysOfWeekOptions,
  type DayOfWeek,
  type ISchedule,
} from '@/utils/categories';

export interface CreateScheduleFormValues {
  schedule: ISchedule;
}
interface CreateScheduleUIProps {
  formValues: CreateScheduleFormValues;
  onChange: (field: keyof CreateScheduleFormValues, value: ISchedule) => void;
}

export const TIME_OPTIONS = Array.from({ length: 24 * 4 }, (_, i) => {
  const hours = String(Math.floor(i / 4)).padStart(2, '0');
  const minutes = String((i % 4) * 15).padStart(2, '0');
  return { value: `${hours}:${minutes}`, label: `${hours}:${minutes}` };
});

const CreateScheduleUI = ({ formValues, onChange }: CreateScheduleUIProps) => {
  const { days: selectedDays, intervals: timeIntervals } = formValues.schedule;

  const toggleDay = (selectedDay: DayOfWeek) => {
    const updatedDays = selectedDays.includes(selectedDay)
      ? selectedDays.filter((day) => day !== selectedDay)
      : [...selectedDays, selectedDay];
    onChange('schedule', { ...formValues.schedule, days: updatedDays });
  };

  const handleSetTime = (
    index: number,
    field: 'start' | 'end',
    value: string
  ) => {
    const updatedIntervals = [...timeIntervals];
    updatedIntervals[index][field] = value;
    onChange('schedule', {
      ...formValues.schedule,
      intervals: updatedIntervals,
    });
  };

  const handleAddInterval = () => {
    onChange('schedule', {
      ...formValues.schedule,
      intervals: [...timeIntervals, { start: '', end: '' }],
    });
  };

  const handleRemoveInterval = (index: number) => {
    const updatedIntervals = timeIntervals.filter((_, i) => i !== index);
    onChange('schedule', {
      ...formValues.schedule,
      intervals: updatedIntervals,
    });
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
              type="button"
            >
              <IoMdRemoveCircleOutline size={24} color="red" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary w-full"
          onClick={handleAddInterval}
        >
          Add interval
        </button>

        <h3 className="text-md font-semibold mt-4">
          Selected Days (Click a day to deactivate)
        </h3>
        <div className="flex gap-2 w-full justify-between">
          {daysOfWeekOptions.map((day: DayOfWeek) => (
            <div className="tooltip" key={day} data-tip={day}>
              <button
                type="button"
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
