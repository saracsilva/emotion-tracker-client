import { useContext, useEffect, useState, useCallback } from 'react';
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
  const d = date ?? new Date();
  const utcDateStr = [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-');

  const { token, isLoading: isSessionLoading } = useContext(SessionContext);
  const [entry, setEntry] = useState<DayEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchEntry = useCallback(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    axios
      .get(`${API_URL}/entries/${utcDateStr}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEntry(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setEntry(null);
        } else {
          setError(err);
        }
        setIsLoading(false);
      });
  }, [utcDateStr, token]);

  useEffect(() => {
    if (!isSessionLoading) {
      fetchEntry();
    }
  }, [fetchEntry, isSessionLoading]);

  return { entry, isLoading, error, refetch: fetchEntry };
}
