import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContextApi from './contexts/authContextApi'
import SocketContextApi from './contexts/socketContextApi'
import ThemeContextApi from './contexts/themeContextApi'

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextApi>
      <AuthContextApi>
        <SocketContextApi>
        <BrowserRouter >
          <App />
        </BrowserRouter>
        </SocketContextApi>
      </AuthContextApi>
    </ThemeContextApi>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
