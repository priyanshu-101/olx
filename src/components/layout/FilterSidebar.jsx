import React, { useState } from 'react'
import { motion } from 'framer-motion'

const FilterSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    location: false,
    brand: false,
    model: false,
    budget: false,
    year: false,
    owners: false,
    kmDriven: false,
    fuel: false,
    transmission: false
  })

  const [filters, setFilters] = useState({
    category: '',
    location: '',
    brand: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    year: '',
    owners: '',
    kmDriven: '',
    fuel: '',
    transmission: ''
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      category: '',
      location: '',
      brand: '',
      model: '',
      minPrice: '',
      maxPrice: '',
      year: '',
      owners: '',
      kmDriven: '',
      fuel: '',
      transmission: ''
    })
  }

  const categories = [
    { id: 'cars', name: 'Cars', icon: '🚗', count: 1245 },
    { id: 'bikes', name: 'Bikes', icon: '🏍️', count: 856 },
    { id: 'mobile', name: 'Mobile Phones', icon: '📱', count: 2341 },
    { id: 'electronics', name: 'Electronics', icon: '💻', count: 1567 },
    { id: 'furniture', name: 'Furniture', icon: '🪑', count: 743 },
    { id: 'fashion', name: 'Fashion', icon: '👕', count: 1890 },
    { id: 'books', name: 'Books', icon: '📚', count: 456 },
    { id: 'sports', name: 'Sports', icon: '⚽', count: 234 },
    { id: 'real-estate', name: 'Real Estate', icon: '🏠', count: 567 },
    { id: 'jobs', name: 'Jobs', icon: '💼', count: 890 }
  ]

  const locations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'
  ]

  const carBrands = [
    'Maruti Suzuki', 'Hyundai', 'Mahindra', 'Tata', 'Honda', 'Toyota',
    'Ford', 'Chevrolet', 'Renault', 'Nissan', 'Volkswagen', 'BMW'
  ]

  const carModels = [
    'Swift', 'Alto', 'i20', 'Verna', 'City', 'Amaze', 'Innova',
    'Fortuner', 'XUV500', 'Scorpio', 'Nexon', 'Tiago'
  ]

  const budgetRanges = [
    'Under ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000 - ₹2,00,000',
    '₹2,00,000 - ₹5,00,000', '₹5,00,000 - ₹10,00,000', 'Above ₹10,00,000'
  ]

  const years = Array.from({ length: 25 }, (_, i) => 2024 - i)
  const ownerOptions = ['1st Owner', '2nd Owner', '3rd Owner', '4th Owner', '5+ Owners']
  const kmDrivenRanges = ['Under 10,000 km', '10,000 - 20,000 km', '20,000 - 40,000 km', '40,000 - 60,000 km', '60,000 - 80,000 km', 'Above 80,000 km']
  const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']
  const transmissionTypes = ['Manual', 'Automatic', 'CVT']

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-blue-600 transition-colors"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-500"
        >
          ▼
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="mt-3">
          {children}
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Active Filters */}
        {Object.values(filters).some(filter => filter) && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null
                return (
                  <span
                    key={key}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                  >
                    {value}
                    <button
                      onClick={() => handleFilterChange(key, '')}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Categories */}
        <FilterSection
          title="Categories"
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection('categories')}
        >
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={filters.category === category.id}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-lg">{category.icon}</span>
                  <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                </div>
                <span className="text-xs text-gray-500">({category.count})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection
          title="Location"
          isExpanded={expandedSections.location}
          onToggle={() => toggleSection('location')}
        >
          <div className="space-y-2">
            {locations.map((location) => (
              <label key={location} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="location"
                  value={location}
                  checked={filters.location === location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{location}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Brand */}
        <FilterSection
          title="Brand"
          isExpanded={expandedSections.brand}
          onToggle={() => toggleSection('brand')}
        >
          <div className="space-y-2">
            {carBrands.map((brand) => (
              <label key={brand} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={filters.brand === brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Model */}
        <FilterSection
          title="Model"
          isExpanded={expandedSections.model}
          onToggle={() => toggleSection('model')}
        >
          <div className="space-y-2">
            {carModels.map((model) => (
              <label key={model} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="model"
                  value={model}
                  checked={filters.model === model}
                  onChange={(e) => handleFilterChange('model', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{model}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Budget */}
        <FilterSection
          title="Budget"
          isExpanded={expandedSections.budget}
          onToggle={() => toggleSection('budget')}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              {budgetRanges.map((range) => (
                <label key={range} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="budgetRange"
                    value={range}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">{range}</span>
                </label>
              ))}
            </div>
          </div>
        </FilterSection>

        {/* Year */}
        <FilterSection
          title="Year"
          isExpanded={expandedSections.year}
          onToggle={() => toggleSection('year')}
        >
          <div className="grid grid-cols-3 gap-2">
            {years.slice(0, 15).map((year) => (
              <label key={year} className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="year"
                  value={year}
                  checked={filters.year === year.toString()}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="sr-only"
                />
                <span className={`text-sm ${filters.year === year.toString() ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                  {year}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Number of Owners */}
        <FilterSection
          title="No. of Owners"
          isExpanded={expandedSections.owners}
          onToggle={() => toggleSection('owners')}
        >
          <div className="space-y-2">
            {ownerOptions.map((owner) => (
              <label key={owner} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="owners"
                  value={owner}
                  checked={filters.owners === owner}
                  onChange={(e) => handleFilterChange('owners', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{owner}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* KM Driven */}
        <FilterSection
          title="KM Driven"
          isExpanded={expandedSections.kmDriven}
          onToggle={() => toggleSection('kmDriven')}
        >
          <div className="space-y-2">
            {kmDrivenRanges.map((range) => (
              <label key={range} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="kmDriven"
                  value={range}
                  checked={filters.kmDriven === range}
                  onChange={(e) => handleFilterChange('kmDriven', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Fuel Type */}
        <FilterSection
          title="Fuel Type"
          isExpanded={expandedSections.fuel}
          onToggle={() => toggleSection('fuel')}
        >
          <div className="space-y-2">
            {fuelTypes.map((fuel) => (
              <label key={fuel} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="fuel"
                  value={fuel}
                  checked={filters.fuel === fuel}
                  onChange={(e) => handleFilterChange('fuel', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{fuel}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Transmission */}
        <FilterSection
          title="Transmission"
          isExpanded={expandedSections.transmission}
          onToggle={() => toggleSection('transmission')}
        >
          <div className="space-y-2">
            {transmissionTypes.map((transmission) => (
              <label key={transmission} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="transmission"
                  value={transmission}
                  checked={filters.transmission === transmission}
                  onChange={(e) => handleFilterChange('transmission', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{transmission}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  )
}

export default FilterSidebar