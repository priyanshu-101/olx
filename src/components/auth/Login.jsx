import React, { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import GoogleAuth from './GoogleAuth'
import OtpVerification from './OtpVerification'
import SEL_LOGO from '../../assets/SEL_LOGO.png'

const Login = ({ onToggleAuth, onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    contact: '',
    password: ''
  })
  const [contactError, setContactError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpScreen, setShowOtpScreen] = useState(false)
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [otpSentTo, setOtpSentTo] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === 'contact') {
      setContactError('');
    }
    if (e.target.name === 'password') {
      setPasswordError('');
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-in clicked')
    // Simulate Google OAuth process
    setTimeout(() => {
      if (onAuthSuccess) {
        onAuthSuccess({
          name: 'Google User',
          email: 'user@gmail.com'
        })
      }
    }, 500)
  }

  const handleFacebookSignIn = () => {
    console.log('Facebook Sign-in clicked')
    // Simulate Facebook OAuth process
    setTimeout(() => {
      if (onAuthSuccess) {
        onAuthSuccess({
          name: 'Facebook User',
          email: 'user@facebook.com'
        })
      }
    }, 500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation for contact (email or phone)
    const value = formData.contact.trim();
    let contactValid = false;
    
    if (/^\d{10}$/.test(value)) {
      // 10 digit phone number
      contactValid = true;
    } else if (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
      // Gmail only - must end with @gmail.com
      contactValid = true;
    }
    
    if (!contactValid) {
      setContactError('Enter a valid 10-digit phone number or @gmail.com email address');
      return;
    }
    
    // Password validation
    const password = formData.password;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
    
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be exactly 8 characters with 1 uppercase, 1 lowercase, 1 digit, and 1 special character');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login validation (dummy check - always pass for demo)
    setTimeout(() => {
      setIsLoading(false);
      
      // Generate random 6-digit OTP
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomOtp);
      
      // Set where OTP was sent
      const destination = value.includes('@') ? value : `+91${value}`;
      setOtpSentTo(destination);
      
      // Show OTP screen
      setShowOtpScreen(true);
      
      // Log the OTP for demo purposes
      console.log(`OTP sent to ${destination}: ${randomOtp}`);
      alert(`Demo: OTP sent to ${destination}\nYour OTP is: ${randomOtp}`);
    }, 2000);
  };

  const handleOtpVerifySuccess = () => {
    // OTP verified successfully, proceed to home page
    if (onAuthSuccess) {
      const value = formData.contact.trim();
      onAuthSuccess({
        name: value.includes('@') ? value.split('@')[0] : value,
        email: value.includes('@') ? value : value + '@olxuser.in',
        contact: value.includes('@') ? value : `+91${value}`
      });
    }
  };

  const handleBackToLogin = () => {
    setShowOtpScreen(false);
  };

  const handleResendOtp = () => {
    // Generate new OTP
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    
    console.log(`New OTP sent to ${otpSentTo}: ${randomOtp}`);
    alert(`Demo: New OTP sent to ${otpSentTo}\nYour OTP is: ${randomOtp}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {!showOtpScreen ? (
          <>
            {/* SEL-style header */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <img src={SEL_LOGO} alt="SEL Logo" className="h-40 w-auto mx-auto" />
              <p className="text-gray-600 text-lg">Welcome back!</p>
              <p className="text-gray-500 text-sm">Sign in to your account</p>
            </Motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Contact Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
                className={`w-full py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${contactError ? 'border-red-500' : 'border-gray-300'} ${formData.contact && /^\d/.test(formData.contact) ? 'pl-12 pr-4' : 'px-4'}`}
                placeholder="Enter @gmail.com email or 10-digit phone number"
                maxLength={50}
              />
              {formData.contact && /^\d/.test(formData.contact) && (
                <span className="absolute left-3 top-3 text-gray-500 text-sm pointer-events-none">+91</span>
              )}
            </div>
            {contactError && <p className="text-red-500 text-xs mt-1">{contactError}</p>}
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your password"
              minLength={8}
              maxLength={8}
            />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between"
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              Forgot password?
            </a>
          </Motion.div>

          <Motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <Motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              'Sign In'
            )}
          </Motion.button>
        </form>

        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Motion.button
              onClick={handleGoogleSignIn}
              whileHover={{ scale: 1.05, backgroundColor: "#f8f9fa" }}
              whileTap={{ scale: 0.95 }}
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Motion.button>

            <Motion.button
              onClick={handleFacebookSignIn}
              whileHover={{ scale: 1.05, backgroundColor: "#f8f9fa" }}
              whileTap={{ scale: 0.95 }}
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </Motion.button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onToggleAuth}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign up here
            </button>
          </p>
          
          {/* Demo button to skip auth */}
          <p className="mt-4 text-center">
            <button
              onClick={() => onAuthSuccess && onAuthSuccess({ name: 'Demo User', email: 'demo@example.com' })}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Skip to Main App (Demo)
            </button>
          </p>
        </Motion.div>
        </>
        ) : (
          /* OTP Verification Screen */
          <OtpVerification
            otpSentTo={otpSentTo}
            generatedOtp={generatedOtp}
            onVerifySuccess={handleOtpVerifySuccess}
            onBackToLogin={handleBackToLogin}
            onResendOtp={handleResendOtp}
          />
        )}
      </Motion.div>
    </div>
  )
}

export default Login