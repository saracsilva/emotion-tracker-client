import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';
import { useDayEntry } from '../hooks/useDayEntry';
import { useEmotions } from '../hooks/useEmotions';
import axios from 'axios';
import Tag from '../components/Tag';
import Button from '../components/Button';

function EmotionSection({ fetchStreak }: { fetchStreak: () => void }) {
  const { token } = useContext(SessionContext);
  const { emotions, isLoading: isLoadingEmotions } = useEmotions();
  const { entry, isLoading: isLoadingEntry, refetch } = useDayEntry();

  const isLoading = isLoadingEntry || isLoadingEmotions;
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const selected = formData.getAll('emotion');
      if (entry) {
        await axios.patch(
          `${API_URL}/entries/${entry._id}`,
          {
            emotions: selected,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } else {
        await axios.post(
          `${API_URL}/entries`,
          {
            emotions: selected,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }
      refetch();
      fetchStreak();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err);
      }
    }
  };

  return (
    <div className='bg-white p-6 rounded-xl w-md '>
      <h3 className='font-bold text-2xl mb-6'>
        How are you{' '}
        <span className='text-secondary font-mono font-semibold'>feeling</span>{' '}
        <span className='font-extrabold'>today?</span>
      </h3>
      {isLoading ? (
        <p>loading... </p>
      ) : !entry?.emotions.length ? (
        <form
          onSubmit={handleSubmit}
          className='flex gap-6 flex-col justify-end'
        >
          <div className='flex flex-wrap gap-2 items-center justify-start'>
            {emotions &&
              emotions.map((emotion) => {
                return (
                  <Tag
                    key={emotion._id}
                    emoji={emotion.emoji}
                    name={emotion.name}
                    id={emotion._id}
                  />
                );
              })}
          </div>
          <Button type='submit' fullWidth={true}>
            Save mood
          </Button>
        </form>
      ) : (
        <div className='mb-3'>
          {entry.emotions.map((emotion) => (
            <Tag
              key={emotion._id}
              emoji={emotion.emoji}
              name={emotion.name}
              id={emotion._id}
              checkable={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EmotionSection;
