# App-in-App Example with Shadow DOM

This example demonstrates how to load a React application inside another React application using Shadow DOM, creating a truly isolated micro-frontend architecture.

## What it Demonstrates

- Loading a remote React component into a host application
- Using Shadow DOM for style isolation
- Dynamic script loading and component mounting
- Cross-origin component communication

## Structure

- `/host-app`: A React application that serves as the container, providing the layout and loading mechanism
- `/remote-app`: A React application that exposes a component to be loaded into the host

## Benefits

1. **True Style Isolation**: Using Shadow DOM ensures that styles from the host application cannot leak into the remote component and vice versa, preventing CSS conflicts.

2. **Independent Development**: Teams can develop and deploy their components independently, without worrying about conflicts with the host application.

3. **Runtime Integration**: Components are loaded at runtime rather than build time, allowing for independent deployment and versioning of components.

4. **Performance**: Only loads the remote component when needed, reducing the initial bundle size of the host application.

5. **Security**: Shadow DOM provides a level of DOM isolation that helps prevent accidental or malicious DOM manipulation between components.

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

## Use Cases

- Micro-frontend architectures
- Plugin systems
- White-label applications
- Third-party widget integration
- Component marketplaces

## Technical Details

The example uses Vite.js for both applications and demonstrates how to:

- Create and manage Shadow DOM instances
- Load remote scripts dynamically
- Handle cross-origin module loading
- Expose and consume global functions for component mounting
