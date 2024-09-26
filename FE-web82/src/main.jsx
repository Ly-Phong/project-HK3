import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' Component={App} />
    </Routes> 
  </BrowserRouter>,
)
