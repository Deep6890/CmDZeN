import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLoginPage from './mainLoginPage'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainLoginPage />
   
  </StrictMode>,
)
