import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

interface CalendarSectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

function CalendarSection({ selectedDate, onDateChange }: CalendarSectionProps) {
  return (
    <div className='bg-white rounded-xl p-6'>
      <p className='font-light text-sm mb-4'>Select a date</p>
      <DayPicker
        mode='single'
        selected={selectedDate}
        onSelect={(date) => {
          if (date) onDateChange(date);
        }}
        disabled={{ after: new Date() }}
      />
    </div>
  );
}

export default CalendarSection;
