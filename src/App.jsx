import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    navigate('/', { replace: true })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    navigate('/login', { replace: true })
  }

  const handleAuthClick = () => {
    navigate('/login')
  }

  const handleToggleToSignup = () => {
    navigate('/signup')
  }

  const handleToggleToLogin = () => {
    navigate('/login')
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage 
              onAuthSuccess={handleAuthSuccess}
              onToggleToSignup={handleToggleToSignup}
            />
          )
        } 
      />
      <Route 
        path="/signup" 
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <SignupPage 
              onAuthSuccess={handleAuthSuccess}
              onToggleToLogin={handleToggleToLogin}
            />
          )
        } 
      />
      
      <Route 
        path="/" 
        element={
          <Home 
            isAuthenticated={isAuthenticated}
            user={user}
            onAuthClick={handleAuthClick}
            onLogout={handleLogout}
          />
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App