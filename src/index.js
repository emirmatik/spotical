import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ContextClass} from './context';
import dotenv from "dotenv";

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <ContextClass>
    <App />
    </ContextClass>
  </React.StrictMode>,
  document.getElementById('root')
);

// apiKey: process.env.API_KEY,
// authDomain: process.env.AUTH_DOMAIN,
// databaseURL: process.env.DATABASE_URL,
// projectId: process.env.PROJECT_ID,
// storageBucket: process.env.STORAGE_BUCKET,
// messagingSenderId: process.env.MESSAGING_SENDER_ID,
// appId: process.env.APP_ID