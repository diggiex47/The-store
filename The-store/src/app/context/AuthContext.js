"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '@/lib/api'

// 1. Create the context itself
const AuthContext = createContext();

// 2. Create the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function checks if the user has a valid session cookie
    // by calling the protected /api/auth/me endpoint.
    async function checkLoggedIn() {
      try {
        const currentUser = await getMe();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        // If getMe fails (e.g., a 401 error), the user is not logged in.
        setUser(null);
      }
      setLoading(false);
    }
    checkLoggedIn();
  }, []); // The empty array [] means this runs only once when the app first loads

  const value = { user, setUser, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Create a custom hook for easy consumption by other components
export function useAuth() {
  return useContext(AuthContext);
}