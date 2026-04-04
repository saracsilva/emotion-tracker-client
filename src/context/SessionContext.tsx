import { createContext, useEffect, useState, ReactNode } from 'react';
import { verify } from '../api/auth';

interface SessionContextType {
  token: string | null;
  saveToken: (newToken: string) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  logout: () => void;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType,
);

const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
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

  const saveToken = (newToken: string) => {
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
