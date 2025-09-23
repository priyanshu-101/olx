import React from 'react'
import Signup from '../components/auth/Signup'

const SignupPage = ({ onAuthSuccess, onToggleToLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <Signup 
        onToggleAuth={onToggleToLogin}
        onAuthSuccess={onAuthSuccess}
      />
    </div>
  )
}

export default SignupPage