import React from 'react'
import Navbar from '../components/layout/Navbar'
import FilterSidebar from '../components/layout/FilterSidebar'

const Motorcycles = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <FilterSidebar selectedCategory="motorcycles" />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Motorcycles</h1>
                <div className="flex items-center space-x-4">
                  <select className="p-2 border border-gray-300 rounded-md">
                    <option value="relevance">Sort by: Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="date-new">Date: Newest First</option>
                    <option value="date-old">Date: Oldest First</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(item => (
                  <div key={item} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Motorcycle Image</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Hero Splendor Plus</h3>
                      <p className="text-lg font-bold text-green-600 mb-2">₹45,000</p>
                      <p className="text-sm text-gray-600 mb-1">2020 • 15,000 km • Petrol</p>
                      <p className="text-sm text-gray-500">Mumbai, Maharashtra</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-md">1</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">4</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">5</button>
                  
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Motorcycles