import { useContext, useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SessionContext } from '../context/SessionContext';
import axios from 'axios';
import Button from '../components/Button';

interface EmotionFrequency {
  name: string;
  emoji: string;
  count: number;
}

function EmotionsFrequencyChart() {
  const { token } = useContext(SessionContext);
  const [data, setData] = useState<EmotionFrequency[]>([]);
  const [period, setPeriod] = useState('week');
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/entries/emotions-frequency?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [token, period]);

  if (isLoading) return <p>Loading...</p>;
  function CustomTooltip({ payload, label, active }: any) {
    if (active && payload && payload.length) {
      return (
        <div
          className='custom-tooltip'
          style={{
            border: '1px solid #2e2c2f',
            backgroundColor: '#fff',
            padding: '10px',
            borderRadius: '12px',
          }}
        >
          <p
            className='label'
            style={{ margin: '0', fontWeight: '700' }}
          >{`Count : ${payload[0].value}`}</p>
          <p className='intro' style={{ margin: '0' }}>
            {label} {payload[0].payload.emoji}
          </p>
        </div>
      );
    }

    return null;
  }
  return (
    <div className='bg-white p-6 rounded-xl w-full'>
      <div className='flex justify-between items-start'>
        <div>
          <p className='font-light'>Emotion history</p>
          <h3 className='font-bold text-2xl mb-6'>
            Your emotions this {period}
          </h3>
        </div>
        <div className='flex gap-4'>
          <Button onClick={() => setPeriod('week')}>Week</Button>
          <Button onClick={() => setPeriod('month')}>Month</Button>
          <Button onClick={() => setPeriod('year')}>Year</Button>
        </div>
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='name' stroke='black' />
          <YAxis stroke='black' />
          <Tooltip
            content={CustomTooltip}
            cursor={{ fill: 'var(--color-primary-100)' }}
          />

          <Bar dataKey='count' fill='var(--color-primary)' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EmotionsFrequencyChart;
