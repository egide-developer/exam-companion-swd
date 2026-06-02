import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ChecklistProvider } from './context/ChecklistContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChecklistProvider>
        <App />
      </ChecklistProvider>
    </BrowserRouter>
  </StrictMode>,
)
