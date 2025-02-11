import React, { createContext, useState, useEffect } from 'react';
import { fetchSessions } from '../services/api'; // Ensure this function is correctly imported

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSessions()
      .then((data) => setSessions(data)) // Ensure fetchSessions returns mock_sessions
      .finally(() => setLoading(false));
  }, []);

  return (
    <SessionContext.Provider value={{ sessions, loading }}>
      {children}
    </SessionContext.Provider>
  );
};
