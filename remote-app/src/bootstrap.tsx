import React from 'react';
import ReactDOM from 'react-dom/client';
import HelloWorld from './components/HelloWorld';

// This is only used when running the remote app standalone
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>
); 