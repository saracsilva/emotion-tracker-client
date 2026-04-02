import { useEffect, useContext, useState } from 'react';
import { SessionContext } from '../context/SessionContext';
import axios from 'axios';

export function useEmotions() {
  const { token } = useContext(SessionContext);
  const [emotions, setEmotions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/emotions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEmotions(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [token]);

  return { emotions, isLoading, error };
}
