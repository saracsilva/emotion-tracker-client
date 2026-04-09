import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

import EmptyState from '../components/EmptyState';
import { useDayEntry } from '../hooks/useDayEntry';
import Button from '../components/Button';

function JournalSection() {
  const { entry, isLoading: isLoadingEntry } = useDayEntry();

  return (
    <div className='bg-white p-6 rounded-xl w-full item-start'>
      <h2 className='font-bold text-2xl mb-6'>
        Your <span className='text-secondary font-mono font-bold'>Journal</span>
      </h2>
      {isLoadingEntry ? (
        <p>Loading...</p>
      ) : entry?.journal ? (
        <>
          <div className='bg-background border-l-4 border-primary-500 p-6'>
            <p className='text-gray-600 line-clamp-3'>{entry.journal}</p>
          </div>
          <Link
            to='/journal'
            className='text-primary-500 block mt-4 text-right hover:underline'
          >
            Read full entry →
          </Link>
        </>
      ) : (
        <EmptyState
          icon={<FileText size={48} strokeWidth={1.25} />}
          title='No journal entry yet today'
          message='How was your day? Take a moment to reflect.'
          action={
            <Button variant='primary' path='/journal'>
              Add entry
            </Button>
          }
        />
      )}
    </div>
  );
}

export default JournalSection;
