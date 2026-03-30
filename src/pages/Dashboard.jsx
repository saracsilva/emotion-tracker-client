import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';

function Dashboard() {
  const { user } = useContext(SessionContext);

  return (
    <div>
      <h1>Welcome back, {user?.firstName}!</h1>
    </div>
  );
}
export default Dashboard;
