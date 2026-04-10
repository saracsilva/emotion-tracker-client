import EmotionSection from '../sections/EmotionSection';
import DailyReflectionsSection from '../sections/DailyReflectionsSection';
import EmotionsFrequencyChart from '../charts/EmotionsFrequencyChart';
import JournalSection from '../sections/JournalSection';

function Dashboard() {
  return (
    <>
      <div className='flex gap-4 w-full'>
        <EmotionSection />
        <DailyReflectionsSection />
      </div>
      <JournalSection />
      <EmotionsFrequencyChart />
    </>
  );
}
export default Dashboard;
