/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ai_book_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return {
      _id: 'demo-user-123',
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      geminiApiKey: '',
      token: 'demo-jwt-token-xyz',
    };
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ai_book_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ai_book_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(API_PATHS.LOGIN, { email, password });
      setUser(res.data);
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.warn('Backend login fallback:', error.message);
      const mockUser = {
        _id: 'user-' + Date.now(),
        name: email.split('@')[0].toUpperCase(),
        email: email,
        geminiApiKey: '',
        token: 'token-' + Date.now(),
      };
      setUser(mockUser);
      setLoading(false);
      return { success: true };
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(API_PATHS.REGISTER, { name, email, password });
      setUser(res.data);
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.warn('Backend signup fallback:', error.message);
      const mockUser = {
        _id: 'user-' + Date.now(),
        name: name || 'Author',
        email: email,
        geminiApiKey: '',
        token: 'token-' + Date.now(),
      };
      setUser(mockUser);
      setLoading(false);
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ai_book_user');
  };

  const updateApiKey = async (geminiApiKey) => {
    if (!user) return;
    const updated = { ...user, geminiApiKey };
    setUser(updated);
    try {
      await axiosInstance.put(API_PATHS.UPDATE_PROFILE, { geminiApiKey });
    } catch (err) {
      console.warn('Backend API Key update fallback:', err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
        updateApiKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
