import { useCallback, useContext, useEffect, useState } from 'react';
import { SessionContext } from '../context/SessionContext';
import axios from 'axios';

export function useStreak() {
  const { token } = useContext(SessionContext);
  const [streak, setStreak] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchStreak = useCallback(() => {
    axios
      .get(`${API_URL}/entries/streak`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStreak(res.data.streak);
      })
      .catch((error) => {
        console.error('Error fetching streak:', error);
      });
  }, [token]);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  return { streak, fetchStreak };
}
