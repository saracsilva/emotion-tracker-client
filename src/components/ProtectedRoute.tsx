import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useContext(SessionContext);

  if (isLoading) return null;
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
}

export default ProtectedRoute;
