import { StrictMode } from 'react'
import { fetchWithCsrf } from "../utils/csrf";import { createRoot } from 'react-dom/client'
import { fetchWithCsrf } from "../utils/csrf";import './index.css'
import App from './App.jsx'
import { fetchWithCsrf } from "../utils/csrf";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
