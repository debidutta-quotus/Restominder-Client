// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from 'styled-components'; // Or import { ThemeProvider } from '@emotion/react'; or import { ThemeProvider } from 'react-jss';
import theme from './theme/theme.tsx'; 

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  // </StrictMode>,
)
