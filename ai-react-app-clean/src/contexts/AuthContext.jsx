// Context creation separated to a different file to fix Fast Refresh
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      setError('');
      const response = await axios.post('/api/auth/register', userData);
      const { token } = response.data;
      setAuthToken(token);
      await loadUser();
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.[0]?.msg || 'Registration failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setError('');
      const response = await axios.post('/api/auth/login', credentials);
      const { token } = response.data;
      setAuthToken(token);
      await loadUser();
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.[0]?.msg || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Logout user
  const logout = () => {
    setAuthToken(null);
    setCurrentUser(null);
  };

  // Load user data
  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      
      setAuthToken(token);
      const response = await axios.get('/api/auth/user');
      setCurrentUser(response.data);
    } catch (err) {
      console.error('Error loading user:', err);
      setAuthToken(null);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check for token on initial load
  useEffect(() => {
    loadUser();
    
    // Cleanup
    return () => {
      setLoading(false);
    };
  }, []);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    error,
    register,
    login,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
