import { createContext, useEffect, useState } from 'react';
import { verify } from '../api/auth';

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

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
        });
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
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
      value={{ token, saveToken, isAuthenticated, user, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
