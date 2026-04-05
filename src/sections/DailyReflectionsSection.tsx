import Button from '../components/Button';

function DailyReflectionsSection() {
  return (
    <div className='bg-white p-6 rounded-xl w-md item-start'>
      <p className='font-light'>Daily reflections</p>
      <h3 className='font-bold text-2xl mb-6'>What’s on your mind? </h3>
      <p>Coming soon...</p>
      <Button fullWidth={true}>Save Reflection</Button>
    </div>
  );
}

export default DailyReflectionsSection;
