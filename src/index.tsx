import React from 'react';
import './styles/index.scss';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import Context from './context';
import store from './store';

const ContextWrapper = () => {
  const contextValue = React.useMemo(() => ({ store }), [store]);
  return (
    <Context.Provider value={contextValue}>
      <App />
    </Context.Provider>
  );
};

const div = document.createElement('div');
div.id = 'root';
document.body.append(div);
const root = createRoot(div);

root.render(
  <React.StrictMode>
    <HashRouter>
      <ContextWrapper />
    </HashRouter>
  </React.StrictMode>
);
