import React from 'react';

const HelloWorld: React.FC = () => {
  return (
    <div className="remote-hello-world">
      <h2>Hello from Remote App! 👋</h2>
      <p>This component is loaded from a remote script into a Shadow DOM.</p>
    </div>
  );
};

export default HelloWorld; 