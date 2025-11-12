import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Page from './Page'
import '/public/common.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
