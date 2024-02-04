import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import { GlobalStyle } from './styles/GlobalStyle';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <GlobalStyle />
    <GlobalProvider>
      <Routes>
        <Route path='/dashboard' element={<App />}/>
        <Route path='/' element={<Auth/>} />
      </Routes>
      
    </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);

