# App-in-App Example with Webpack Module Federation

This example demonstrates how to load a React application inside another React application using Webpack Module Federation, creating a truly integrated micro-frontend architecture.

## What it Demonstrates

- Loading a remote React component into a host application using Module Federation
- Sharing dependencies between applications
- Dynamic loading of federated modules with React.lazy() and Suspense
- Cross-origin component integration

## Structure

- `/host-app`: A React application that serves as the container, providing the layout and loading mechanism
- `/remote-app`: A React application that exposes a component to be consumed by the host

## Benefits

1. **Dependency Sharing**: Module Federation allows sharing dependencies between applications, reducing bundle sizes and ensuring consistent versions.

2. **Independent Development**: Teams can develop and deploy their components independently, without worrying about conflicts with the host application.

3. **Runtime Integration**: Components are loaded at runtime rather than build time, allowing for independent deployment and versioning of components.

4. **Performance**: Only loads the remote component when needed, reducing the initial bundle size of the host application.

5. **TypeScript Support**: Full TypeScript support for federated modules with proper type definitions.

## Getting Started

1. Start the remote app:

```bash
cd remote-app
npm install
npm run dev
```

2. Start the host app:

```bash
cd host-app
npm install
npm run dev
```

3. Visit `http://localhost:5173` to see the example in action.

## Implementation Details

### Webpack Configuration

Both applications use Webpack 5 with Module Federation. The configuration files are named `webpack.config.cjs` to ensure they're treated as CommonJS modules despite the ES modules setting in package.json.

#### Host App Configuration

The host app is configured to consume the remote component:

```javascript
// host-app/webpack.config.cjs
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    remoteApp: "remoteApp@http://localhost:5174/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
  },
});
```

#### Remote App Configuration

The remote app exposes its component:

```javascript
// remote-app/webpack.config.cjs
new ModuleFederationPlugin({
  name: "remoteApp",
  filename: "remoteEntry.js",
  exposes: {
    "./HelloWorld": "./src/components/HelloWorld",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
  },
});
```

### Complete Host App Integration Example

Here's a complete example of how to integrate the remote component in the host application:

```typescript
// host-app/src/App.tsx
import React, { lazy, Suspense } from "react";

// TypeScript declaration for the remote module (in a separate file: remoteTypes.d.ts)
// declare module 'remoteApp/HelloWorld' {
//   const HelloWorld: React.ComponentType;
//   export default HelloWorld;
// }

// Dynamically import the remote component using Module Federation
const RemoteHelloWorld = lazy(() => import("remoteApp/HelloWorld"));

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
          {/* Use Suspense to handle the loading state */}
          <Suspense fallback={<div>Loading remote component...</div>}>
            {/* The remote component is rendered just like a local component */}
            <RemoteHelloWorld />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
```

### Bootstrap Files

For Module Federation to work correctly, we need to use dynamic imports in the entry files:

```typescript
// host-app/src/index.ts
// This file is the entry point for webpack
// It dynamically imports the bootstrap file to ensure Module Federation works correctly
import("./bootstrap");
```

```typescript
// host-app/src/bootstrap.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Use Cases

- Micro-frontend architectures
- Plugin systems
- White-label applications
- Third-party widget integration
- Component marketplaces

## Technical Details

The example uses Webpack 5's Module Federation and demonstrates how to:

- Configure Module Federation plugins
- Share dependencies between applications
- Dynamically load federated modules with React.lazy()
- Handle TypeScript types for federated modules
- Set up proper module bootstrapping for Module Federation
