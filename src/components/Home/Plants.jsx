import { useState, useEffect } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';
import Card from './Card';
import Container from '../Shared/Container';
import EmptyState from '../Shared/EmptyState';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';

import LoadingSpinner from '../Shared/LoadingSpinner';

const Plants = () => {
  const initialPlants = useLoaderData();
  const [plants, setPlants] = useState(initialPlants);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sunlight: ''
  });

  // Available filter options
  const categories = ['Indoor', 'Outdoor', 'Succulent', 'Flowering'];
  const priceRanges = ['Under $10', '$10-$25', '$25-$50', 'Over $50'];
  const sunlightOptions = ['Low', 'Medium', 'High'];

  // Apply filters and search
  useEffect(() => {
    setLoading(true);
    let filtered = [...initialPlants];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(plant =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(plant => plant.category === filters.category);
    }

    // Apply price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(plant => {
        const price = plant.price;
        if (filters.priceRange.startsWith('Under')) return price < min;
        if (filters.priceRange.startsWith('Over')) return price > min;
        return price >= min && price <= max;
      });
    }

    // Apply sunlight filter
    if (filters.sunlight) {
      filtered = filtered.filter(plant => plant.sunlight === filters.sunlight);
    }

    setPlants(filtered);
    setLoading(false);
  }, [initialPlants, searchTerm, filters]);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      sunlight: ''
    });
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <Container>
      {/* Search and Filter Bar */}
      <div className="sticky top-0 bg-white z-10 py-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Our Plant Collection</h1>
          
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search plants..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FiFilter /> Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === cat}
                        onChange={() => setFilters({...filters, category: cat})}
                        className="text-green-600 focus:ring-green-500"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range}
                        onChange={() => setFilters({...filters, priceRange: range})}
                        className="text-green-600 focus:ring-green-500"
                      />
                      {range}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sunlight Filter */}
              <div>
                <h3 className="font-medium mb-2">Sunlight Needs</h3>
                <div className="space-y-2">
                  {sunlightOptions.map(level => (
                    <label key={level} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sunlight"
                        checked={filters.sunlight === level}
                        onChange={() => setFilters({...filters, sunlight: level})}
                        className="text-green-600 focus:ring-green-500"
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(filters.category || filters.priceRange || filters.sunlight) && (
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-green-600 hover:text-green-800 flex items-center gap-1"
              >
                <FiX /> Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="py-4 text-sm text-gray-600">
        {plants.length} {plants.length === 1 ? 'plant' : 'plants'} found
      </div>

      {/* Loading State */}
      {loading && <LoadingSpinner className="my-8" />}

      {/* Plants Grid */}
      {!loading && plants && plants.length > 0 ? (
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {plants.map(plant => (
            <Card 
              key={plant._id} 
              plant={plant}
              className="transition-transform hover:scale-105 hover:shadow-lg"
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          message='No plants match your search criteria'
          actionText="Clear filters"
          onAction={clearFilters}
        />
      )}
    </Container>
  );
};

export default Plants;