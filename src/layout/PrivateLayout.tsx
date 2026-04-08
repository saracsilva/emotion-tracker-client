import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { SessionContext } from '../context/SessionContext';
import { StreakContext } from '../context/StreakContext';
import { useContext } from 'react';

function PrivateLayout() {
  const { user } = useContext(SessionContext);
  const { streak } = useContext(StreakContext);

  return (
    <div className='flex p-5 gap-4 min-h-screen'>
      <Sidebar />
      <main className='flex-1 flex flex-col gap-4'>
        <Header user={user} streak={streak} />
        <div className='bg-background p-6 flex flex-col flex-1 gap-4 rounded-xl items-start'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default PrivateLayout;
