import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router.tsx';
import "./style/CSS/normalize.css";
import "./style/SASS/main.scss";
import ContextProvider from './utils/context/ContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <Router />
    </ContextProvider>
  </React.StrictMode>,
)
