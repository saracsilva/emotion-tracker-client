import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(SessionContext);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
}

export default ProtectedRoute;
