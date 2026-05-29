import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import styles from './Calendar.module.css';

interface CalendarSectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  highlightedDates?: Date[];
  onMonthChange?: (month: Date) => void;
}

function CalendarSection({
  selectedDate,
  onDateChange,
  highlightedDates,
  onMonthChange,
}: CalendarSectionProps) {
  return (
    <div className='bg-white rounded-xl p-6'>
      <p className='font-light text-sm mb-4'>Select a date</p>
      <DayPicker
        mode='single'
        selected={selectedDate}
        onSelect={(date) => {
          if (date) {
            const normalized = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
            );
            onDateChange(normalized);
          }
        }}
        disabled={{ after: new Date() }}
        onMonthChange={onMonthChange}
        modifiers={{ highlighted: highlightedDates }}
        modifiersClassNames={{
          highlighted: styles['calendar__day-highlighted'],
        }}
      />
    </div>
  );
}

export default CalendarSection;
