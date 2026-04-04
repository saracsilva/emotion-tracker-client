import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { SessionContext } from '../context/SessionContext';
import axios from 'axios';

interface DayEntry {
  _id: string;
  date: string;
  user: string;
  emotions: Emotion[];
  reflection: string;
  journal: string;
}

interface Emotion {
  _id: string;
  name: string;
  emoji: string;
  isDefault: boolean;
  user: string | null;
}

export function useDayEntry(date?: Date) {
  const stableDate = useRef(date ?? new Date()).current;
  const { token } = useContext(SessionContext);
  const [entry, setEntry] = useState<DayEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchEntry = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/entries/${stableDate}`, {
        params: { stableDate },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEntry(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [stableDate, token]);

  useEffect(() => {
    fetchEntry();
  }, [fetchEntry]);

  return { entry, isLoading, error, refetch: fetchEntry };
}
