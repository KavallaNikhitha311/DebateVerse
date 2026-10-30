import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('debateverse_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authApi.getMe();
          if (res.success && res.student) {
            setUser(res.student);
          } else {
            logout();
          }
        } catch (err) {
          console.warn('[AuthContext] Session verification failed:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    if (res.success) {
      localStorage.setItem('debateverse_token', res.token);
      setToken(res.token);
      setUser(res.student);
      return res.student;
    }
  };

  const register = async (userData) => {
    const res = await authApi.register(userData);
    if (res.success) {
      localStorage.setItem('debateverse_token', res.token);
      setToken(res.token);
      setUser(res.student);
      return res.student;
    }
  };

  const logout = () => {
    localStorage.removeItem('debateverse_token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    const res = await authApi.updateProfile(profileData);
    if (res.success && res.student) {
      setUser(res.student);
    }
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);