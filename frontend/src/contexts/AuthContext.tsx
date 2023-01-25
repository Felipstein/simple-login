/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../api';
import { User } from '../types/User';

interface AuthResult {
  user?: User;
  token?: string;
  errorMessage?: string;
}

export interface IAuthContext {
  isAuth: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<AuthResult>;
  logout: () => void;
}

// @ts-ignore
const AuthContext = createContext<IAuthContext>();

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');

    if(!token) {
      return null;
    }

    const storedUser = localStorage.getItem('user');
    if(!storedUser) {
      localStorage.removeItem('token');
      return null;
    }

    const user = JSON.parse(storedUser) as User;
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    return user;
  });

  useEffect(() => {
    async function verifyTokenAndUser() {
      const token = localStorage.getItem('token');

      if(!token) {
        return;
      }

      const { data: user } = await api.post('/auth/validate', { token });

      if(!user) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        api.defaults.headers.common.authorization = undefined;
        alert('Sessão expirada');
        return;
      }

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    }

    verifyTokenAndUser();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });

      const { token, user } = data;

      setUser(user);
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { user, token };
    } catch (err: Error | any) {
      return { errorMessage: err.response?.data?.message || err.message || 'Erro desconhecido' };
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string, confirmPassword: string) => {
    try {
      const { data } = await api.post('/auth/signup', { name, email, password, confirmPassword });

      const { token, user } = data;

      setUser(user);
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { user, token };
    } catch (err: Error | any) {
      return { errorMessage: err.response?.data?.message || err.message || 'Erro desconhecido' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    api.defaults.headers.common.authorization = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth: !!user,
      user,
      login,
      signup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => useContext(AuthContext);
