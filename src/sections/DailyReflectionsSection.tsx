import Button from '../components/Button';
import Textarea from '../components/Textarea';
import axios from 'axios';
import { useContext, useState } from 'react';
import { SessionContext } from '../context/SessionContext';
import { useDayEntry } from '../hooks/useDayEntry';
import { Pencil } from 'lucide-react';

function DailyReflectionsSection() {
  const { token } = useContext(SessionContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const { entry, isLoading, refetch } = useDayEntry();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onclick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const reflection = formData.get('reflection');
      await axios.post(
        `${API_URL}/entries`,
        {
          reflection: reflection,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      refetch();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-white p-6 rounded-xl w-md item-start'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='font-light'>Daily reflections</p>
          <h3 className='font-bold text-2xl mb-6'>What’s on your mind? </h3>
        </div>
        {entry?.reflection && !isEditing && (
          <Button iconOnly={true} onClick={onclick}>
            <Pencil size={20} />
          </Button>
        )}
      </div>
      {isLoading ? (
        <p>loading... </p>
      ) : !entry?.reflection || isEditing ? (
        <>
          <form
            className='flex gap-6 flex-col justify-end'
            onSubmit={handleSubmit}
          >
            <Textarea
              value={entry?.reflection || ''}
              name='reflection'
              placeholder='Write your thoughts here...'
            />
            <Button type='submit' fullWidth={true} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Reflection'}
            </Button>
          </form>
        </>
      ) : (
        <>
          <p className='text-gray-600'>{entry.reflection}</p>
        </>
      )}
    </div>
  );
}

export default DailyReflectionsSection;
