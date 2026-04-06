import Logo from '../assets/emotion_tracker_logo.svg';

function Sidebar() {
  return (
    <aside className='shrink-0 bg-background rounded-xl p-8 w-80'>
      <div className='flex justify-center mb-24 mt-8'>
        <img src={Logo} alt='Emotion tracker logo' className='w-44' />
      </div>
      <div className='pl-6'>
        <div>
          <h2 className=' font-light text-xs mb-4'>MENU</h2>
          <ul className='space-y-3'>
            <li>Dashboard</li>
            <li>Journal</li>
            <li>Emotions</li>
            <li>Charts</li>
          </ul>
        </div>
        <div className='mt-4'>
          <h2 className=' font-light text-xs py-4'>GENERAL</h2>
          <ul className='space-y-3'>
            <li>Settings</li>
            <li>Help</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
