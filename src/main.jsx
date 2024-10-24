
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '../context/context.jsx'
import { Suspense } from 'react'
import { Loading } from '../components/Loading.jsx'

createRoot(document.getElementById('root')).render(
  
   
      <ThemeProvider>
          <App />
      </ThemeProvider>

)
