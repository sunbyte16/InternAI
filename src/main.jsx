import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

// Debug logging for production
console.log('InternAI: Starting application...')
console.log('InternAI: Current URL:', window.location.href)
console.log('InternAI: Base URL:', import.meta.env.BASE_URL)

const root = document.getElementById('root')
if (!root) {
  console.error('InternAI: Root element not found!')
} else {
  console.log('InternAI: Root element found, rendering app...')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)