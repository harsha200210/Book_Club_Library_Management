import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {AuthProvider} from "./context/AuthProvider.tsx";
import {LibraryProvider} from "./context/LibraryProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <LibraryProvider>
              <App />
          </LibraryProvider>
      </AuthProvider>
  </StrictMode>,
)
