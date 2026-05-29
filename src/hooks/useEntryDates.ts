import { useEffect, useContext, useState, useCallback } from 'react';
import { SessionContext } from '../context/SessionContext';
import axios from 'axios';

export function useEntryDates(month: Date) {
  const { token } = useContext(SessionContext);
  const [dates, setDates] = useState<Date[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const year = month.getFullYear();
  const monthNum = month.getMonth() + 1;

  const fetchDates = useCallback(() => {
    if (!token) return;
    axios
      .get(`${API_URL}/entries/dates?year=${year}&month=${monthNum}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) =>
        setDates(response.data.map((d: string) => new Date(d))),
      )
      .catch(console.error);
  }, [year, monthNum, token]);

  useEffect(() => {
    fetchDates();
  }, [fetchDates]);

  return { dates, refetchDates: fetchDates };
}
