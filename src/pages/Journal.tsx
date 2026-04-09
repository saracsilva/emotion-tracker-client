import axios from 'axios';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import { useDayEntry } from '../hooks/useDayEntry';
import { SessionContext } from '../context/SessionContext';
import { useContext, useState } from 'react';

function Journal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { entry, isLoading: isLoadingEntry, refetch } = useDayEntry();
  const { token } = useContext(SessionContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const journal = formData.get('journal');
      if (entry) {
        axios.patch(
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
        axios.post(
          `${API_URL}/entries`,
          {
            journal: journal,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
      console.log('Journal entry saved successfully', journal);
      refetch();
    } catch (error) {
      console.error('Error saving journal entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex gap-4 w-full h-full'>
      <div className='flex-1 mx-auto p-6 bg-white rounded-xl'>
        {isLoadingEntry ? (
          <p>Loading...</p>
        ) : entry?.journal ? (
          <p className='text-gray-700 whitespace-pre-wrap'>{entry.journal}</p>
        ) : (
          <form onSubmit={handleSubmit} className='flex flex-col h-full'>
            <label className='block font-bold text-3xl mb-6' htmlFor='journal'>
              Your{' '}
              <span className='text-secondary font-mono font-bold'>
                journal{' '}
              </span>
              entry for today
            </label>
            <Textarea
              id='journal'
              placeholder='Write your journal entry here...'
              value={entry?.journal || ''}
              name='journal'
              className='flex-1'
            />
            <Button
              type='submit'
              className='mt-4'
              variant='primary'
              disabled={isSubmitting}
            >
              Save Journal Entry
            </Button>
          </form>
        )}
      </div>
      <div className=' mx-auto p-6 bg-white rounded-xl'>
        <p className='font-light text-sm mb-4'>Something</p>
      </div>
    </div>
  );
}

export default Journal;
