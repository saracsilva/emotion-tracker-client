import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import EmotionSection from '../sections/EmotionSection';
import DailyReflectionsSection from '../sections/DailyReflectionsSection';

function Dashboard() {
  const { user } = useContext(SessionContext);

  return (
    <div className='flex p-5 gap-4 min-h-screen'>
      <Sidebar />
      <main className='flex-1 flex flex-col gap-4'>
        <Header user={user} />
        <div className='bg-background p-6 flex flex-1 gap-4 rounded-xl items-start'>
          <EmotionSection />
          <DailyReflectionsSection />
        </div>
      </main>
    </div>
  );
}
export default Dashboard;
