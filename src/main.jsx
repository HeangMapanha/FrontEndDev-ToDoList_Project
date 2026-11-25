import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

import { TagProvider } from './context/TagContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <TaskProvider>
            <TagProvider>
              <App />
            </TagProvider>
          </TaskProvider>
        </SettingsProvider>
      </AuthProvider>
      
      </BrowserRouter>

  </StrictMode>,
)
