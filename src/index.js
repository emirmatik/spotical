import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ContextClass} from './context';

ReactDOM.render(
  <React.StrictMode>
    <ContextClass>
    <App />
    </ContextClass>
  </React.StrictMode>,
  document.getElementById('root')
);