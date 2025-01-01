import type {} from '@melchor629/hny-scripts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'

const container = document.querySelector('#root')!
const root = createRoot(container)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
