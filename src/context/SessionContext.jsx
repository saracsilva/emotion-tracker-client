import { createContext, useEffect, useState } from 'react';
import { verify } from '../api/auth';

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      verify(token)
        .then((response) => {
          setIsAuthenticated(true);
          setUser(response.data.user);
        })
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [token]);

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setIsLoading(true);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <SessionContext.Provider
      value={{ token, saveToken, isAuthenticated, isLoading, user, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
