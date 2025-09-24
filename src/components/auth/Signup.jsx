import React, { useState } from 'react'
import { motion } from 'framer-motion'
import GoogleAuth from './GoogleAuth'
import SEL_LOGO from '../../assets/SEL_LOGO.png'

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    if (name === 'username' && value.length >= 3) {
      checkUsernameAvailability(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors({
          ...errors,
          profileImage: 'Please select a valid image file'
        });
        return;
      }
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
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
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
    setTimeout(() => {
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
    const contact = formData.contact.trim();
    if (!contact) {
      newErrors.contact = 'Email or contact number is required';
    } else if (/^\d/.test(contact)) {
      if (!/^\d{10}$/.test(contact)) {
        newErrors.contact = 'Contact number must be exactly 10 digits';
      }
    } else {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contact)) {
        newErrors.contact = 'Enter a valid email address';
      }
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username must be less than 20 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers and underscore';
    }

    if (!formData.profileImage) {
      newErrors.profileImage = 'Profile image is required';
    }

    const password = formData.password;
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/.test(password)) {
      newErrors.password = 'Password must be exactly 8 characters with 1 uppercase, 1 lowercase, 1 digit, and 1 special character';
    }

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
    setTimeout(() => {
      setIsLoading(false);
      console.log('Signup submitted:', {
        contact: formData.contact.includes('@') ? formData.contact : `+91${formData.contact}`,
        username: formData.username,
        profileImage: formData.profileImage?.name || 'uploaded_image.jpg'
      });

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
    <div className="min-h-screen  flex items-center justify-center p-4"
     style={{ backgroundColor: '#cbd3d7ff' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white  shadow-2xl p-4 w-full max-w-lg"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-2"
        >
          <img src={SEL_LOGO} alt="SEL Logo" className="h-16 w-auto mx-auto" />
          <p className="text-gray-600 text-sm">Join SEL today!</p>
        </motion.div>

        <div className="w-full">

        <form onSubmit={handleSubmit} className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Contact
            </label>
            <div className="relative">
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className={`w-full py-1.5 text-sm border rounded focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                  errors.contact ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                } ${formData.contact && /^\d/.test(formData.contact) ? 'pl-10 pr-3' : 'px-3'}`}
                placeholder="Email or phone"
                maxLength={50}
              />
              {formData.contact && /^\d/.test(formData.contact) && (
                <span className="absolute left-2 top-1.5 text-gray-500 text-xs pointer-events-none">+91</span>
              )}
            </div>
            {errors.contact && (
              <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                  errors.username ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Username"
                minLength={3}
                maxLength={20}
              />
              {isCheckingUsername && (
                <div className="absolute right-2 top-1.5">
                  <div className="w-3 h-3 border border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-[#004896] hover:file:bg-green-100"
                />
              </div>
            </div>
            {errors.profileImage && (
              <p className="text-red-500 text-xs mt-1">{errors.profileImage}</p>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                errors.password ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Password"
              minLength={8}
              maxLength={8}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Confirm password"
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
            <span className="ml-2 text-xs text-gray-600">
              I agree to{' '}
              <a href="#" className="text-[#004896] transition-colors">
                Terms
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#004896] transition-colors">
                Privacy
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
            className="w-full text-white font-medium py-1.5 px-4 rounded text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{ backgroundColor: '#004896' }}
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

        {/* Already have account text - centered at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-2 text-center"
        >
          <p className="text-xs text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onToggleAuth}
              className="font-medium text-[#004896]"
            >
              Sign in
            </button>
          </p>
        </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup