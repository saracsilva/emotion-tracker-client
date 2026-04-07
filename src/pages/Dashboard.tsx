import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';
import { useStreak } from '../hooks/useStreak';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import EmotionSection from '../sections/EmotionSection';
import DailyReflectionsSection from '../sections/DailyReflectionsSection';
import EmotionsFrequencyChart from '../charts/EmotionsFrequencyChart';

function Dashboard() {
  const { user } = useContext(SessionContext);
  const { streak, fetchStreak } = useStreak();

  return (
    <div className='flex p-5 gap-4 min-h-screen'>
      <Sidebar />
      <main className='flex-1 flex flex-col gap-4'>
        <Header user={user} streak={streak} />
        <div className='bg-background p-6 flex flex-col flex-1 gap-4 rounded-xl items-start'>
          <div className='flex gap-4 w-full'>
            <EmotionSection fetchStreak={fetchStreak} />
            <DailyReflectionsSection />
          </div>
          <EmotionsFrequencyChart />
        </div>
      </main>
    </div>
  );
}
export default Dashboard;
