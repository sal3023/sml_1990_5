
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import '../index.css';

console.log('Attempting to mount React app...');
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Could not find root element to mount to");
  // Optionally, display a fallback message to the user
  document.body.innerHTML = '<div style="color: red; text-align: center; margin-top: 50px;">Error: Could not find root element to mount to.</div>';
} else {
  console.log('Root element found, creating React root...');
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React app rendered.');
}
