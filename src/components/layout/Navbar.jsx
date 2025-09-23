import React, { useState, useEffect, useRef } from 'react'

const Navbar = ({ onAuthClick, isAuthenticated = false, user = null }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const locationRef = useRef(null)
  const languageRef = useRef(null)
  const categoriesRef = useRef(null)

  const toggleLocation = () => setIsLocationOpen(!isLocationOpen)
  const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false)
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false)
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white font-bold text-xl px-3 py-1 rounded">
              SEL
            </div>
          </div>

          <div className="hidden md:flex items-center ml-4">
            <div className="relative" ref={locationRef}>
              <button 
                onClick={toggleLocation}
                className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-800 font-medium">India</span>
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isLocationOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border z-50">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Popular Cities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'].map((city) => (
                        <button key={city} className="text-left p-2 hover:bg-gray-100 rounded text-sm text-gray-600 hover:text-blue-600">
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <div className="flex">
                <input
                  type="text"
                  placeholder='Search "Jobs"'
                  className="w-full px-4 py-2 border-2 border-black rounded-l-md focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="bg-black text-white px-6 py-2 rounded-r-md hover:bg-gray-800 transition-colors flex items-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={languageRef}>
              <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-gray-800 font-medium hover:text-blue-600 transition-colors"
              >
                <span>ENGLISH</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-50">
                  <div className="p-2">
                    {['English', 'हिंदी', 'मराठी', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'ગુજરાતી', 'বাংলা'].map((language) => (
                      <button key={language} className="block w-full text-left p-2 hover:bg-gray-100 rounded text-sm text-gray-700 hover:text-blue-600">
                        {language}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {!isAuthenticated ? (
              <button
                onClick={onAuthClick}
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors underline"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-gray-800 font-medium">{user?.name || 'User'}</span>
              </div>
            )}

            <button className="bg-yellow-400 border-2 border-yellow-400 text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-300 transition-colors flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>SELL</span>
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 py-3 overflow-x-hidden">
            <div className="relative" ref={categoriesRef}>
              <button 
                onClick={toggleCategories}
                className="flex items-center space-x-1 text-gray-800 font-medium whitespace-nowrap hover:text-blue-600 transition-colors"
              >
                <span>ALL CATEGORIES</span>
                <svg 
                  className={`w-4 h-4 transform transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {['Cars', 'Motorcycles', 'Mobile Phones', 'For Sale: Houses & Apartments', 'Scooters', 'Commercial & Other Vehicles', 'For Rent: Houses & Apartments'].map((category) => (
              <button
                key={category}
                className="text-gray-600 hover:text-blue-600 whitespace-nowrap transition-colors text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Width Category Dropdown */}
      {isCategoriesOpen && (
        <div className="absolute left-0 right-0 top-full bg-white shadow-xl border-b border-gray-200 z-[100]">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Cars Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-black text-base mb-3">Cars</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Cars</button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-black text-base mb-3">Bikes</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Motorcycles</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Scooters</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Spare Parts</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Bicycles</button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-black text-base mb-3">Properties</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">For Sale: Houses & Apartments</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">For Rent: Houses & Apartments</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Lands & Plots</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">For Rent: Shops & Offices</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">For Sale: Shops & Offices</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">PG & Guest Houses</button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-black text-base mb-3">Electronics & Appliances</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">TVs, Video - Audio</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Kitchen & Other Appliances</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Computers & Laptops</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Cameras & Lenses</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Games & Entertainment</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Fridges</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Computer Accessories</button>
                  </div>
                </div>
              </div>

              {/* Mobiles Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-black text-base mb-3">Mobiles</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Mobile Phones</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Accessories</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Tablets</button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-black text-base mb-3">Commercial Vehicles & Spares</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Commercial & Other Vehicles</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Spare Parts</button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-black text-base mb-3">Jobs</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Data entry & Back office</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Sales & Marketing</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">BPO & Telecaller</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Driver</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Office Assistant</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Delivery & Collection</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Teacher</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Cook</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Receptionist & Front office</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Operator & Technician</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">IT Engineer & Developer</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Hotel & Travel Executive</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Accountant</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Designer</button>
                  </div>
                </div>
              </div>

              {/* Furniture Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-black text-base mb-3">Furniture</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Sofa & Dining</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Beds & Wardrobes</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Home Decor & Garden</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Kids Furniture</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Other Household Items</button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-black text-base mb-3">Fashion</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Men</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Women</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Kids</button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-black text-base mb-3">Pets</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Fishes & Aquarium</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Pet Food & Accessories</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Dogs</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Other Pets</button>
                  </div>
                </div>
              </div>

              {/* Books & Services Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-black text-base mb-3">Books, Sports & Hobbies</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Books</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Gym & Fitness</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Musical Instruments</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Sports Equipment</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Other Hobbies</button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-black text-base mb-3">Services</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Education & Classes</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Tours & Travel</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Electronics Repair & Services</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Health & Beauty</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Home Renovation & Repair</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Cleaning & Pest Control</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Legal & Documentation Services</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Packers & Movers</button>
                    <button className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1">Other Services</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <div className="flex">
              <input
                type="text"
                placeholder='Search "Jobs"'
                className="flex-1 px-4 py-2 border-2 border-black rounded-l-md focus:outline-none focus:border-blue-500"
              />
              <button className="bg-black text-white px-4 py-2 rounded-r-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <button className="flex items-center space-x-2 text-gray-800">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>India</span>
            </button>

            {!isAuthenticated ? (
              <button
                onClick={onAuthClick}
                className="block w-full text-left text-gray-800 font-medium py-2"
              >
                Login
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 py-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-gray-800 font-medium">{user?.name || 'User'}</span>
                </div>
              </div>
            )}

            <button className="w-full bg-yellow-400 border-2 border-yellow-400 text-black font-bold py-2 rounded-full hover:bg-yellow-300 transition-colors">
              + SELL
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar