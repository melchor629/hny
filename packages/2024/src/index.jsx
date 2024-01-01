/// <reference types="@melchor629/hny-scripts" />

import { createRoot } from 'react-dom/client'
import App from './app'

const element = document.getElementById('root')
const root = createRoot(element)
root.render(<App />)
