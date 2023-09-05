import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router.tsx';
import "./style/CSS/normalize.css";
import "./style/SASS/main.scss";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
