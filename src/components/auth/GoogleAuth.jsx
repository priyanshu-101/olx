import React, { useState } from 'react'
import { motion } from 'framer-motion'

const GoogleAuth = ({ type = 'login', onSuccess, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    
    try {
      // Simulate Google OAuth process
      console.log(`Google ${type} initiated`)
      
      // Here you would normally integrate with Google OAuth
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate successful authentication
      const mockUserData = {
        id: 'google_' + Date.now(),
        email: 'user@gmail.com',
        name: 'John Doe',
        picture: 'https://via.placeholder.com/150',
        provider: 'google'
      }
      
      console.log('Google authentication successful:', mockUserData)
      
      if (onSuccess) {
        onSuccess(mockUserData)
      } else {
        alert(`Google ${type} successful! \nUser: ${mockUserData.name}\nEmail: ${mockUserData.email}`)
      }
      
    } catch (error) {
      console.error('Google authentication failed:', error)
      alert(`Google ${type} failed. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.button
      onClick={handleGoogleAuth}
      disabled={isLoading}
      whileHover={{ scale: isLoading ? 1 : 1.02 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      className={`w-full bg-white border-2 border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-3 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-gray-400 border-t-blue-500 rounded-full"
          />
          <span className="text-lg">Processing...</span>
        </>
      ) : (
        <>
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-lg">
            {type === 'login' ? 'Continue with Google' : 'Sign up with Google'}
          </span>
        </>
      )}
    </motion.button>
  )
}

export default GoogleAuth