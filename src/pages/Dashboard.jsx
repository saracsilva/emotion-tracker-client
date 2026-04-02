import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../context/SessionContext';
import Logo from '../assets/emotion_tracker_logo.svg';
import EmotionSection from '../sections/EmotionSection';

function Dashboard() {
  const { user } = useContext(SessionContext);

  return (
    <div className='flex p-5 gap-4 min-h-screen'>
      <aside className='shrink-0 bg-background rounded-xl p-8'>
        <div className='flex justify-center'>
          <img src={Logo} alt='Emotion tracker logo' width='139' height='150' />
        </div>
        <div className='pl-6 my-8'>
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
      <main className='flex-1 flex flex-col gap-4'>
        <header className='bg-background p-6 pl-11 rounded-xl'>
          <h1 className='font-semibold text-2xl'>
            Welcome back,{' '}
            <span className='font-extrabold'>{user?.firstName}</span>!
          </h1>
          <p className='font-light text-lg'>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>
        <div className='bg-background p-6 flex-1 rounded-xl'>
          <EmotionSection />
        </div>
      </main>
    </div>
  );
}
export default Dashboard;
