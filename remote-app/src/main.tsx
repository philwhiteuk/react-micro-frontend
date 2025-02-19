import React from 'react'
import ReactDOM from 'react-dom/client'
import HelloWorld from './components/HelloWorld'

// Define the type for the global window object
declare global {
  interface Window {
    mountRemoteApp: (container: HTMLElement) => void;
  }
}

// Create the mount function
const mountRemoteApp = (container: HTMLElement) => {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <HelloWorld />
    </React.StrictMode>
  );
};

// Expose the mount function globally
window.mountRemoteApp = mountRemoteApp;

// Export the mount function to ensure it's not tree-shaken
export { mountRemoteApp };
