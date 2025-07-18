import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []); // Додано порожній масив залежностей

  const login = useCallback(async (email) => {
    const user = { email, name: email.split('@')[0] };
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  }, [navigate]);

  const value = { currentUser, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
