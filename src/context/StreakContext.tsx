import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useContext,
} from 'react';
import axios from 'axios';
import { SessionContext } from './SessionContext';

interface StreakContextType {
  streak: number;
  fetchStreak: () => Promise<void>;
}

export const StreakContext = createContext<StreakContextType>(
  {} as StreakContextType,
);

const StreakContextProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useContext(SessionContext);
  const [streak, setStreak] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchStreak = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/entries/streak`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStreak(res.data.streak);
    } catch (error) {
      console.error('Error fetching streak:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  return (
    <StreakContext.Provider value={{ streak, fetchStreak }}>
      {children}
    </StreakContext.Provider>
  );
};

export default StreakContextProvider;
