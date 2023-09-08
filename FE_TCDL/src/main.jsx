import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './container/App.jsx';
import './styles/index.css';
import { SearchContextProvider } from './contexts/Search.context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </React.StrictMode>,
);
