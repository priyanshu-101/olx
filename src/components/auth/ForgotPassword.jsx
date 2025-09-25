import React, { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import SEL_LOGO from '../../assets/SEL_LOGO.png'

const ForgotPassword = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({
    contact: ''
  })
  const [contactError, setContactError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'contact') {
      setContactError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const value = formData.contact.trim()
    let contactValid = false
    
    if (/^\d{10}$/.test(value)) {
      contactValid = true
    } else if (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
      contactValid = true
    }
    
    if (!contactValid) {
      setContactError('Enter a valid 10-digit phone number or @gmail.com email address')
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      
      const destination = value.includes('@') ? value : `+91${value}`
      console.log(`Password reset link sent to ${destination}`)
      alert(`Demo: Password reset instructions sent to ${destination}`)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: '#cbd3d7ff' }}>
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl p-8 w-full max-w-md text-center"
        >
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <img src={SEL_LOGO} alt="SEL Logo" className="h-16 w-auto mx-auto mb-4" />
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Check your email</h2>
            <p className="text-gray-600 text-sm mb-6">
              We've sent password reset instructions to your email address.
            </p>
            <Motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBackToLogin}
              className="w-full text-white font-medium py-2 px-4 rounded text-sm transition-all duration-200"
              style={{ backgroundColor: '#004896' }}
            >
              Back to Login
            </Motion.button>
          </Motion.div>
        </Motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#cbd3d7ff' }}>
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl p-6 w-full max-w-md"
      >
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <img src={SEL_LOGO} alt="SEL Logo" className="h-16 w-auto mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Forgot Password?</h2>
          <p className="text-gray-600 text-sm">
            Enter your email or phone number and the instructions to reset your password.
          </p>
        </Motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
                className={`w-full py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${contactError ? 'border-red-500' : 'border-gray-300'} ${formData.contact && /^\d/.test(formData.contact) ? 'pl-12 pr-3' : 'px-3'}`}
                placeholder="Enter email or phone number"
                maxLength={50}
              />
              {formData.contact && /^\d/.test(formData.contact) && (
                <span className="absolute left-3 top-2 text-gray-500 text-sm pointer-events-none">+91</span>
              )}
            </div>
            {contactError && <p className="text-red-500 text-xs mt-1">{contactError}</p>}
          </Motion.div>

          <Motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full text-white font-medium py-2 px-4 rounded text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{ backgroundColor: '#004896' }}
          >
            {isLoading ? (
              <Motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              'Send Reset Instructions'
            )}
          </Motion.button>
        </form>
      </Motion.div>
    </div>
  )
}

export default ForgotPassword