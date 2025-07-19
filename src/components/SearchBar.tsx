import React, { useState, useEffect } from 'react';
import { useUserSession } from '../store/userSession';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useUserSession();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search to avoid too many state updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm]);

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <input
          type="text"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          placeholder="Search products by name..."
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        />
        
        {localSearchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors duration-200"
          >
            <svg
              className="h-5 w-5 text-gray-400 hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Searching for: <span className="font-medium text-blue-600">"{searchTerm}"</span>
          </p>
          <button
            onClick={handleClearSearch}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 