import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../context/SessionContext';
import axios from 'axios';
import Tag from '../components/Tag';
import Button from '../components/Button';

function EmotionSection() {
  const { token } = useContext(SessionContext);
  const [emotions, setEmotions] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selected = formData.getAll('emotion');
    try {
      await axios.post(
        `${API_URL}/entries`,
        {
          emotions: selected,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/emotions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEmotions(response.data);
      });
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white p-6 gap-6 rounded-xl w-md flex flex-col justify-end'
    >
      <h3 className='font-bold text-2xl'>
        How are you{' '}
        <span className='text-secondary font-mono font-semibold'>feeling</span>{' '}
        <span className='font-extrabold'>today?</span>
      </h3>
      <div className='flex flex-wrap gap-2 items-center justify-start'>
        {emotions &&
          emotions.map((emotion) => {
            return (
              <Tag
                key={emotion._id}
                emoticon={emotion.emoji}
                name={emotion.name}
              />
            );
          })}
      </div>
      <Button fullWidth={true}>Save mood</Button>
    </form>
  );
}

export default EmotionSection;
