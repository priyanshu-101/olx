import React, { useState } from 'react'
import Auth from './components/auth/Auth'
import Navbar from './components/layout/Navbar'
import MainContent from './components/layout/MainContent'

const App = () => {
  const [showAuth, setShowAuth] = useState(true) // Start with auth for demo
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleAuthClick = () => {
    setShowAuth(true)
  }

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    setShowAuth(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setShowAuth(true)
  }

  // Show auth pages without navbar
  if (showAuth) {
    return (
      <div className="App">
        <Auth onAuthSuccess={handleAuthSuccess} />
      </div>
    )
  }

  // Show main app with navbar
  return (
    <div className="App">
      <Navbar 
        onAuthClick={handleAuthClick}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <MainContent />
    </div>
  )
}

export default App