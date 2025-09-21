import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Login from './Login'
import Signup from './Signup'

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)

  const toggleAuth = () => {
    setIsLogin(!isLogin)
  }

  const handleAuthSuccess = (userData) => {
    // Simulate successful authentication
    if (onAuthSuccess) {
      onAuthSuccess(userData)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isLogin ? (
        <motion.div
          key="login"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <Login onToggleAuth={toggleAuth} onAuthSuccess={handleAuthSuccess} />
        </motion.div>
      ) : (
        <motion.div
          key="signup"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <Signup onToggleAuth={toggleAuth} onAuthSuccess={handleAuthSuccess} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Auth