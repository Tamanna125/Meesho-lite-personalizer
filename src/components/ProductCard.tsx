import React from 'react';
import { useUserSession } from '../store/userSession';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  region: string;
  language: string;
  category: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  score: number;
  isRegionMatch: boolean;
  isLanguageMatch: boolean;
  isPartialLanguageMatch: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  score,
  isRegionMatch,
  isLanguageMatch,
  isPartialLanguageMatch
}) => {
  const { toggleLikedCategory, likedCategories } = useUserSession();

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking heart
    toggleLikedCategory(product.category);
    
    // Show feedback
    const isLiked = likedCategories.includes(product.category);
    console.log(`${isLiked ? 'Removed' : 'Added'} ${product.category} ${isLiked ? 'from' : 'to'} liked categories`);
  };

  const isCategoryLiked = likedCategories.includes(product.category);

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 relative ${
        isRegionMatch && isLanguageMatch ? 'ring-2 ring-green-500' : 
        isRegionMatch || isLanguageMatch ? 'ring-2 ring-yellow-500' : ''
      } ${isCategoryLiked ? 'border-2 border-blue-500 bg-blue-50' : ''}`}
    >
      {/* Priority Badge */}
      {(isRegionMatch || isLanguageMatch) && (
        <div className="absolute top-2 right-2 z-10">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            isRegionMatch && isLanguageMatch 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {isRegionMatch && isLanguageMatch ? 'Perfect Match' : 'Good Match'}
          </span>
        </div>
      )}

      {/* Liked Category Badge */}
      {isCategoryLiked && (
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 animate-pulse">
            ❤️ Liked
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Floating Heart Button */}
      <button
        onClick={handleHeartClick}
        className="absolute bottom-4 right-4 w-8 h-8 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 z-10"
      >
        <span className="text-lg">
          {isCategoryLiked ? '❤️' : '🤍'}
        </span>
      </button>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          Score: {score} points
        </p>
        <p className="text-gray-600 text-sm mb-3">
          {product.description}
        </p>
        
        {/* Match Indicators */}
        <div className="flex items-center space-x-2 mb-3">
          {isRegionMatch && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              📍 {product.region}
            </span>
          )}
          {isLanguageMatch && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              🌐 {product.language}
            </span>
          )}
          {isPartialLanguageMatch && !isLanguageMatch && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              🌐 Similar
            </span>
          )}
        </div>

        {/* Category with Like Status */}
        <div className="mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
            isCategoryLiked 
              ? 'bg-red-100 text-red-800 border border-red-300' 
              : 'bg-gray-100 text-gray-800 border border-gray-300'
          }`}>
            <span className="mr-1">
              {isCategoryLiked ? '❤️' : '📂'}
            </span>
            {product.category}
            {isCategoryLiked && ' (Liked)'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking button
              // Add to cart logic here
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>

        {/* Click Hint */}
        <div className="mt-3 text-xs text-gray-500 text-center">
          {isCategoryLiked ? '💡 Click heart to unlike this category' : '💡 Click heart to like this category'}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 