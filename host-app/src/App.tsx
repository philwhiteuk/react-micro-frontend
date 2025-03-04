import React, { lazy, Suspense } from 'react';

// Dynamically import the remote component using Module Federation
const RemoteHelloWorld = lazy(() => import('remoteApp/HelloWorld'));

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <h1>Host Application</h1>
      </nav>
      
      <aside className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul>
      </aside>
      
      <main className="main-content">
        <div className="remote-app-container">
          <Suspense fallback={<div>Loading remote component...</div>}>
            <RemoteHelloWorld />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
