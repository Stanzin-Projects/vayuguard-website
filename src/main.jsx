import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Prerender hook: @prerenderer/renderer-puppeteer snapshots after this event.
// A plain setTimeout is used (not rAF) because headless Chrome may never fire
// animation frames before the first paint. 400ms is ample for React's commit.
setTimeout(() => document.dispatchEvent(new Event('render-event')), 400)
