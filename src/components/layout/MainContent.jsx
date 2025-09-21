import React from 'react'
import { motion } from 'framer-motion'
import FilterSidebar from './FilterSidebar'

const MainContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Filter Sidebar - Hidden on mobile, shown on larger screens */}
      <div className="hidden lg:block">
        <FilterSidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Search Bar */}
        <div className="bg-white border-b border-gray-200 p-4 lg:hidden">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Find Cars, Mobile Phones and more..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Search
            </motion.button>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="bg-white border-b border-gray-200 p-4 hidden lg:block">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Find Cars, Mobile Phones and more..."
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Search
              </motion.button>
            </div>
          </div>
        </div>

        {/* Breadcrumb and Results Count */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="text-sm text-gray-600 hidden sm:block">
              <span>Home</span> &gt; <span>All Categories</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">1,247</span> ads found
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Relevance</option>
                <option>Date: Newest first</option>
                <option>Date: Oldest first</option>
                <option>Price: Low to high</option>
                <option>Price: High to low</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              {/* Mobile Filter Button */}
              <button className="lg:hidden flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:text-gray-800 hover:border-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
                <span>Filters</span>
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 border border-gray-300 rounded bg-gray-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Listings */}
        <div className="p-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 12 }, (_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index % 6) }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="relative">
                    <div className="bg-gray-200 h-40 sm:h-48 rounded-t-lg"></div>
                    <div className="absolute top-2 right-2">
                      <button className="p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm sm:text-base">
                      {index % 4 === 0 && "Maruti Swift VDI 2018"}
                      {index % 4 === 1 && "iPhone 14 Pro Max 256GB"}
                      {index % 4 === 2 && "2BHK Apartment for Rent"}
                      {index % 4 === 3 && "Royal Enfield Classic 350"}
                    </h4>
                    <p className="text-green-600 font-bold text-base sm:text-lg mb-1">
                      {index % 4 === 0 && "₹ 5,25,000"}
                      {index % 4 === 1 && "₹ 85,000"}
                      {index % 4 === 2 && "₹ 25,000/month"}
                      {index % 4 === 3 && "₹ 1,45,000"}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mb-2">
                      {index % 3 === 0 && "Mumbai, Maharashtra"}
                      {index % 3 === 1 && "Delhi, NCR"}
                      {index % 3 === 2 && "Bangalore, Karnataka"}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{Math.floor(Math.random() * 7) + 1} days ago</span>
                      <div className="flex items-center space-x-2">
                        <span>📷 {Math.floor(Math.random() * 10) + 3}</span>
                        <span>👁 {Math.floor(Math.random() * 100) + 50}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Load More Ads
              </motion.button>
            </div>
          </div>
        </div>

        {/* Featured Ads Section */}
        <div className="bg-yellow-50 border-t border-yellow-200 p-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-yellow-400 text-yellow-800 px-2 py-1 rounded text-xs font-bold mr-2">FEATURED</span>
              Sponsored Ads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }, (_, index) => (
                <motion.div
                  key={`featured-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-yellow-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer relative"
                >
                  <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-800 px-2 py-1 rounded text-xs font-bold">
                    FEATURED
                  </div>
                  <div className="bg-gray-200 h-32 rounded-t-lg"></div>
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Featured Product {index + 1}</h4>
                    <p className="text-green-600 font-bold">₹ {(Math.random() * 100000 + 10000).toFixed(0)}</p>
                    <p className="text-gray-500 text-xs">Premium Location</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent