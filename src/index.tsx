import React from 'react';
import './styles/index.scss';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';

const div = document.createElement('div');
div.id = 'root';
document.body.append(div);
const root = createRoot(div);

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
