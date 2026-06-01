import axios from 'axios';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import { useDayEntry } from '../hooks/useDayEntry';
import { useEntryDates } from '../hooks/useEntryDates';
import { SessionContext } from '../context/SessionContext';
import { useContext, useState } from 'react';
import { Pencil } from 'lucide-react';
import Calendar from '../components/Calendar';

function Journal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const {
    entry,
    isLoading: isLoadingEntry,
    refetch,
  } = useDayEntry(selectedDate);
  const { dates: highlightedDates, refetchDates } = useEntryDates(currentMonth);
  const { token } = useContext(SessionContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const dateStr = [
    selectedDate.getFullYear(),
    String(selectedDate.getMonth() + 1).padStart(2, '0'),
    String(selectedDate.getDate()).padStart(2, '0'),
  ].join('-');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const journal = formData.get('journal');
      if (entry) {
        await axios.patch(
          `${API_URL}/entries/${entry._id}`,
          {
            journal: journal,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        await axios.post(
          `${API_URL}/entries`,
          {
            journal: journal,
            date: dateStr,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
      refetch();
      refetchDates();
    } catch (error) {
      console.error('Error saving journal entry:', error);
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };

  return (
    <div className='flex gap-4 w-full h-full'>
      <div className='flex-1 mx-auto p-6 bg-white rounded-xl'>
        {isLoadingEntry ? (
          <p>Loading...</p>
        ) : !entry?.journal || isEditing ? (
          <form
            key={dateStr}
            onSubmit={handleSubmit}
            className='flex flex-col h-full'
          >
            <label className='block font-bold text-3xl mb-6' htmlFor='journal'>
              Your{' '}
              <span className='text-secondary font-mono font-bold'>
                journal
              </span>{' '}
              entry for today
            </label>
            <Textarea
              id='journal'
              placeholder='Write your journal entry here...'
              value={entry?.journal || ''}
              name='journal'
              className='flex-1'
            />
            <div className='flex gap-2 mt-4'>
              <Button
                type='button'
                variant='default'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type='submit' variant='primary' disabled={isSubmitting}>
                Save Journal Entry
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div className='flex items-start justify-between'>
              <h1 className='block font-bold text-3xl mb-6'>
                Your{' '}
                <span className='text-secondary font-mono font-bold'>
                  journal
                </span>{' '}
                entry for today
              </h1>
              <Button
                iconOnly={true}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <Pencil size={20} />
              </Button>
            </div>
            <p className='text-gray-700 whitespace-pre-wrap'>
              {entry?.journal}
            </p>
          </>
        )}
      </div>
      <div className=' mx-auto p-6 bg-white rounded-xl'>
        <Calendar
          selectedDate={selectedDate}
          onDateChange={(date) => {
            setSelectedDate(date);
            setIsEditing(false);
          }}
          onMonthChange={setCurrentMonth}
          highlightedDates={highlightedDates}
        />
      </div>
    </div>
  );
}

export default Journal;
