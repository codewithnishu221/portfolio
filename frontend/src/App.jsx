import { useState, useEffect } from 'react'
import { PaperPlaneProvider } from './context/PaperPlaneContext'
import Navigation from './components/Navigation'
import BackgroundAnimation from './components/BackgroundAnimation'
import PaperPlane from './components/PaperPlane'
import ChatWidget from './components/ChatWidget'
import MainPage from './sections/MainPage'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <PaperPlaneProvider>
      <BackgroundAnimation />
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      <PaperPlane />
      <ChatWidget />
      <MainPage />
    </PaperPlaneProvider>
  )
}

export default App
