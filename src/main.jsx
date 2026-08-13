import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StringTune, { StringProgress } from '@fiddle-digital/string-tune'
import './index.css'
import App from './App.jsx'

const stringTune = StringTune.getInstance()
stringTune.use(StringProgress)
stringTune.start(60)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

