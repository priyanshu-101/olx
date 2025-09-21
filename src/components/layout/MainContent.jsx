import React from 'react'
import { motion } from 'framer-motion'

const MainContent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              Find anything you need on OLX
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover amazing deals from people around you
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-200"
            >
              Start Exploring
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-800 text-center mb-12"
          >
            Browse by Category
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Cars', icon: '🚗', color: 'bg-blue-500' },
              { name: 'Mobiles', icon: '📱', color: 'bg-green-500' },
              { name: 'Houses', icon: '🏠', color: 'bg-purple-500' },
              { name: 'Jobs', icon: '💼', color: 'bg-orange-500' },
              { name: 'Bikes', icon: '🏍️', color: 'bg-red-500' },
              { name: 'Electronics', icon: '💻', color: 'bg-indigo-500' },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-200"
              >
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-gray-800 text-center mb-12"
          >
            Fresh Recommendations
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.03 }}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Sample Product {item}</h4>
                  <p className="text-green-600 font-bold text-lg mb-1">₹ 25,000</p>
                  <p className="text-gray-500 text-sm">Delhi, India</p>
                  <p className="text-gray-400 text-xs mt-2">2 days ago</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Start Selling Today
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Turn your unused items into cash. It's free and easy!
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 font-semibold py-4 px-10 rounded-full hover:shadow-lg transition-all duration-200 text-lg"
            >
              Post Your Ad Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default MainContent