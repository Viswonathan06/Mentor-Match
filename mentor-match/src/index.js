import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import { UserProvider } from './context/UserContext';
import { SessionProvider } from './context/SessionContext';

// Get the root element from the HTML file
const container = document.getElementById('root');

// Create a root using createRoot
const root = createRoot(container);

// Render the app using the root
root.render(
  <UserProvider>
    <SessionProvider>
      <App />
    </SessionProvider>
  </UserProvider>
);
