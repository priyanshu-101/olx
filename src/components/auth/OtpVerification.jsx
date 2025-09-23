import React, { useState, useEffect } from 'react'

const OtpVerification = ({ 
  otpSentTo, 
  onVerifySuccess, 
  onBackToLogin, 
  onResendOtp,
  generatedOtp 
}) => {
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')

  useEffect(() => {
    const input = document.getElementById('otp-input')
    if (input) {
      input.focus()
    }
  }, [])

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') 
    if (value.length <= 6) {
      setOtp(value)
      if (otpError) setOtpError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log('Submit clicked, OTP:', otp) // Debug log
    
    if (otp.length !== 6) {
      setOtpError('Please enter a 6-digit OTP')
      return
    }
    
    if (otp !== generatedOtp) {
      setOtpError('Invalid OTP. Please try again.')
      return
    }
    
    // OTP is valid
    console.log('OTP verified successfully') // Debug log
    if (onVerifySuccess) {
      onVerifySuccess()
    }
  }

  const handleButtonClick = (e) => {
    console.log('Button clicked, OTP length:', otp.length) // Debug log
    if (otp.length === 6) {
      handleSubmit(e)
    } else {
      setOtpError('Please enter all 6 digits')
    }
  }

  const handleResend = () => {
    setOtp('')
    setOtpError('')
    onResendOtp()
  }

  // Handle individual digit inputs
  const handleDigitInput = (index, value) => {
    if (!/^\d*$/.test(value)) return // Only allow digits
    
    const newOtp = otp.split('')
    newOtp[index] = value
    
    // Fill empty spaces with empty strings
    while (newOtp.length < 6) {
      newOtp.push('')
    }
    
    const newOtpString = newOtp.join('').slice(0, 6)
    setOtp(newOtpString)
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          <span className="text-green-600">S</span>
          <span className="text-blue-600">E</span>
          <span className="text-purple-600">L</span>
        </h1>
        <p className="text-gray-600 text-lg">Verify Your Account</p>
        <p className="text-gray-500 text-sm mt-2">
          Enter the OTP sent to <span className="font-medium">{otpSentTo}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            Enter 6-Digit OTP
          </label>
          <div className="flex justify-center space-x-2 mb-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                id={`digit-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                value={otp[index] || ''}
                onChange={(e) => handleDigitInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-xl font-bold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  otpError ? 'border-red-500' : 'border-gray-300'
                }`}
                autoComplete="off"
              />
            ))}
          </div>
          
          <div className="mt-4">
            <p className="text-xs text-gray-500 text-center mb-2">Or enter all digits at once:</p>
            <input
              id="otp-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={otp}
              onChange={handleOtpChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-center text-lg font-mono tracking-widest ${
                otpError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              autoComplete="one-time-code"
            />
          </div>
          
          {otpError && (
            <p className="text-red-500 text-sm mt-2 text-center">{otpError}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleButtonClick}
          className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
            otp.length === 6
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 cursor-pointer transform hover:scale-105'
              : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600 cursor-pointer'
          }`}
        >
          Verify OTP
        </button>
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-600">
            Didn't receive the OTP?
          </p>
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium transition-colors block mx-auto"
          >
            Resend OTP
          </button>
          
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors block mx-auto mt-4"
          >
            ← Back to Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default OtpVerification