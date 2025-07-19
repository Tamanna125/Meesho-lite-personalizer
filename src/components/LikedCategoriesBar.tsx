import React from 'react';
import { useUserSession } from '../store/userSession';

const LikedCategoriesBar: React.FC = () => {
  const { likedCategories, toggleLikedCategory } = useUserSession();

  if (likedCategories.length === 0) {
    return null; // Don't render anything if no liked categories
  }

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Liked Categories ({likedCategories.length})
        </h3>
        
        <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
          {likedCategories.map((category) => (
            <div
              key={category}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap hover:bg-blue-200 transition-colors duration-200"
            >
              <span>{category}</span>
              <button
                onClick={() => toggleLikedCategory(category)}
                className="ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-300 transition-colors duration-200"
                aria-label={`Remove ${category} from liked categories`}
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikedCategoriesBar; 