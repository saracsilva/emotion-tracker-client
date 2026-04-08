import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateLayout from './layout/PrivateLayout';
import Journal from './pages/Journal';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route
        element={
          <ProtectedRoute>
            <PrivateLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/journal' element={<Journal />} />
      </Route>
    </Routes>
  );
}

export default App;
