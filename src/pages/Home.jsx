import React from 'react'
import Navbar from '../components/layout/Navbar'
import MainContent from '../components/layout/MainContent'

const Home = ({ isAuthenticated, user, onAuthClick, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onAuthClick={onAuthClick}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
      />
      <MainContent />
    </div>
  )
}

export default Home