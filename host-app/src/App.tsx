import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    mountRemoteApp?: (container: HTMLElement) => void;
  }
}

function App() {
  const shadowRootRef = useRef<HTMLDivElement>(null);
  const shadowRoot = useRef<ShadowRoot | null>(null);

  useEffect(() => {
    if (!shadowRootRef.current) return;

    // Create shadow root if it doesn't exist
    if (!shadowRoot.current) {
      shadowRoot.current = shadowRootRef.current.attachShadow({ mode: 'open' });
      
      // Create a container element inside the shadow root
      const container = document.createElement('div');
      shadowRoot.current.appendChild(container);
    }

    // Load remote script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'http://localhost:5174/@vite/client';
    document.head.appendChild(script);

    const appScript = document.createElement('script');
    appScript.type = 'module';
    appScript.src = 'http://localhost:5174/src/main.tsx';
    appScript.onload = () => {
      if (window.mountRemoteApp && shadowRoot.current) {
        const container = shadowRoot.current.firstElementChild as HTMLElement;
        window.mountRemoteApp(container);
      }
    };
    document.head.appendChild(appScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(appScript);
    };
  }, []);

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
          <div ref={shadowRootRef}></div>
        </div>
      </main>
    </div>
  )
}

export default App
