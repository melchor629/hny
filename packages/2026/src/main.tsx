import type {} from '@melchor629/hny-scripts'
import { createRoot } from 'react-dom/client'
import App from './app'
import './styles/tailwind.css'

const root = createRoot(document.querySelector<HTMLDivElement>('#app')!)
root.render(<App />)
