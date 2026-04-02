import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { SessionContext } from '../context/SessionContext';
import axios from 'axios';

export function useDayEntry(date) {
  const stableDate = useMemo(() => date ?? new Date(), []);
  const { token } = useContext(SessionContext);
  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
