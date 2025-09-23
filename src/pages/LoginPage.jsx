import React from 'react'
import Login from '../components/auth/Login'

const LoginPage = ({ onAuthSuccess, onToggleToSignup }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <Login 
        onToggleAuth={onToggleToSignup}
        onAuthSuccess={onAuthSuccess}
      />
    </div>
  )
}

export default LoginPage