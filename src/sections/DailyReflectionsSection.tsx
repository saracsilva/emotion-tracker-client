import Button from '../components/Button';
import Textarea from '../components/Textarea';
import axios from 'axios';
import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';
import { useDayEntry } from '../hooks/useDayEntry';

function DailyReflectionsSection() {
  const { token } = useContext(SessionContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const { entry, isLoading, refetch } = useDayEntry();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const reflection = formData.get('reflection');
      console.log(reflection);
      await axios.post(
        `${API_URL}/entries`,
        {
          reflection: reflection,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='bg-white p-6 rounded-xl w-md item-start'>
      <p className='font-light'>Daily reflections</p>
      <h3 className='font-bold text-2xl mb-6'>What’s on your mind? </h3>
      {isLoading ? (
        <p>loading... </p>
      ) : !entry?.reflection ? (
        <>
          <form
            className='flex gap-6 flex-col justify-end'
            onSubmit={handleSubmit}
          >
            <Textarea
              name='reflection'
              placeholder='Write your thoughts here...'
            />
            <Button fullWidth={true}>Save Reflection</Button>
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
