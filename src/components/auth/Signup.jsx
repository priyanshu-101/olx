import React, { useState } from 'react'
import { motion } from 'framer-motion'
import GoogleAuth from './GoogleAuth'

const Signup = ({ onToggleAuth, onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    contact: '',
    username: '',
    profileImage: null,
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [imagePreview, setImagePreview] = useState(null)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)

  const handleGoogleSuccess = (userData) => {
    console.log('Google signup successful:', userData)
    // Here you would typically:
    // 1. Send the Google token to your backend
    // 2. Create new user account with Google data
    // 3. Set authentication state
    // 4. Redirect to onboarding or dashboard
    alert(`Welcome ${userData.name}! \nAccount created with Google.`)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    // Check username availability in real-time
    if (name === 'username' && value.length >= 3) {
      checkUsernameAvailability(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({
          ...errors,
          profileImage: 'Please select a valid image file'
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          profileImage: 'Image size must be less than 5MB'
        });
        return;
      }

      setFormData({
        ...formData,
        profileImage: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.profileImage) {
        setErrors({
          ...errors,
          profileImage: ''
        });
      }
    }
  };

  const checkUsernameAvailability = async (username) => {
    if (username.length < 3) return;
    
    setIsCheckingUsername(true);
    // Simulate API call to check username availability
    setTimeout(() => {
      // Simulate some taken usernames
      const takenUsernames = ['admin', 'user', 'test', 'olx', 'seller', 'buyer'];
      if (takenUsernames.includes(username.toLowerCase())) {
        setErrors(prev => ({
          ...prev,
          username: 'Username is already taken'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          username: ''
        }));
      }
      setIsCheckingUsername(false);
    }, 500);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Contact validation (email or phone)
    const contact = formData.contact.trim();
    if (!contact) {
      newErrors.contact = 'Email or contact number is required';
    } else if (/^\d/.test(contact)) {
      // Phone validation - must be exactly 10 digits
      if (!/^\d{10}$/.test(contact)) {
        newErrors.contact = 'Contact number must be exactly 10 digits';
      }
    } else {
      // Email validation - any valid email
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contact)) {
        newErrors.contact = 'Enter a valid email address';
      }
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username must be less than 20 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers and underscore';
    }

    // Profile image validation
    if (!formData.profileImage) {
      newErrors.profileImage = 'Profile image is required';
    }

    // Password validation - exactly 8 characters with requirements
    const password = formData.password;
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/.test(password)) {
      newErrors.password = 'Password must be exactly 8 characters with 1 uppercase, 1 lowercase, 1 digit, and 1 special character';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      console.log('Signup submitted:', {
        contact: formData.contact.includes('@') ? formData.contact : `+91${formData.contact}`,
        username: formData.username,
        profileImage: formData.profileImage?.name || 'uploaded_image.jpg'
      });
      
      // Simulate successful signup
      if (onAuthSuccess) {
        onAuthSuccess({
          name: formData.username,
          email: formData.contact.includes('@') ? formData.contact : `${formData.contact}@olxuser.in`,
          contact: formData.contact.includes('@') ? formData.contact : `+91${formData.contact}`,
          username: formData.username,
          profileImage: imagePreview
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl"
      >
        {/* SEL-style header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="text-green-600">S</span>
            <span className="text-blue-600">E</span>
            <span className="text-purple-600">L</span>
          </h1>
          <p className="text-gray-600 text-lg">Join SEL today!</p>
          <p className="text-gray-500 text-sm">Create your account to start buying and selling</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:border-r lg:border-gray-200 lg:pr-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-center"
            >
              <GoogleAuth 
                type="signup" 
                onSuccess={handleGoogleSuccess}
                className="mb-6 hover:border-green-300 hover:bg-green-50"
              />
            </motion.div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or create account with email</span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="text-center"
            >
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={onToggleAuth}
                  className="font-medium text-green-600 hover:text-green-500 transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </motion.div>
          </div>
          <div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Contact Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className={`w-full py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                  errors.contact ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                } ${formData.contact && /^\d/.test(formData.contact) ? 'pl-12 pr-3' : 'px-3'}`}
                placeholder="Enter email or 10-digit phone number"
                maxLength={50}
              />
              {formData.contact && /^\d/.test(formData.contact) && (
                <span className="absolute left-3 top-2 text-gray-500 text-sm pointer-events-none">+91</span>
              )}
            </div>
            {errors.contact && (
              <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Use any email address or 10-digit Indian mobile number
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                  errors.username ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Choose a unique username"
                minLength={3}
                maxLength={20}
              />
              {isCheckingUsername && (
                <div className="absolute right-3 top-2">
                  <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              3-20 characters, letters, numbers and underscore only
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
            </div>
            {errors.profileImage && (
              <p className="text-red-500 text-xs mt-1">{errors.profileImage}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Upload JPG, PNG or GIF. Max size 5MB.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                errors.password ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Create a password"
              minLength={8}
              maxLength={8}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Must be exactly 8 characters with uppercase, lowercase, digit & special character
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Confirm your password"
              minLength={8}
              maxLength={8}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center"
          >
            <input
              type="checkbox"
              required
              className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-green-600 hover:text-green-800 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-green-600 hover:text-green-800 transition-colors">
                Privacy Policy
              </a>
            </span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              'Create Account'
            )}
          </motion.button>
        </form>
        </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup