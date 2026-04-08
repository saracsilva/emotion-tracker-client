import EmotionSection from '../sections/EmotionSection';
import DailyReflectionsSection from '../sections/DailyReflectionsSection';
import EmotionsFrequencyChart from '../charts/EmotionsFrequencyChart';

function Dashboard() {
  return (
    <>
      <div className='flex gap-4 w-full'>
        <EmotionSection />
        <DailyReflectionsSection />
      </div>
      <EmotionsFrequencyChart />
    </>
  );
}
export default Dashboard;
