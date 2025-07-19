import React from 'react';
import { useUserSession } from '../store/userSession';
import ProductCard from './ProductCard';
import sampleProductsData from '../data/sampleProducts.json';

// Sample product data with region and language tags
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

interface ProductWithScore extends Product {
  score: number;
}

// Use imported sample products data
const sampleProducts: Product[] = sampleProductsData;

const Feed: React.FC = () => {
  const { preferredLanguage, region, likedCategories, preferredBudget, searchTerm } = useUserSession();

  // Calculate personalization score for a single product (budget already filtered)
  const calculateProductScore = (product: Product): number => {
    let score = 0;

    // Region matching (highest priority)
    if (product.region === region) score += 10;

    // Language matching (high priority)
    if (product.language === preferredLanguage) score += 8;

    // Partial language matching (e.g., 'hi' matches 'hi-IN')
    const userLangBase = preferredLanguage.split('-')[0];
    const productLangBase = product.language.split('-')[0];

    if (productLangBase === userLangBase && product.language !== preferredLanguage) score += 4;

    // Liked categories boost
    if (likedCategories.includes(product.category)) score += 6;

    return score;
  };

  // Filter and rerank products based on user preferences
  const getFilteredAndRerankedProducts = (products: Product[]): ProductWithScore[] => {
    // Step 1: Filter out products that exceed the budget
    const withinBudgetProducts = products.filter(product => product.price <= preferredBudget);

    // Step 2: Filter products by search term (case-insensitive)
    const searchFilteredProducts = searchTerm 
      ? withinBudgetProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : withinBudgetProducts;

    // Step 3: Calculate personalization scores for products within budget and search
    const productsWithScores: ProductWithScore[] = searchFilteredProducts.map(product => ({
      ...product,
      score: calculateProductScore(product)
    }));

    // Step 4: Filter out products with personalization score < 6
    const filteredProducts = productsWithScores.filter(product => product.score >= 6);

    // Step 5: Sort by score in descending order
    return filteredProducts.sort((a, b) => b.score - a.score);
  };

  const rerankedProducts = getFilteredAndRerankedProducts([...sampleProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with user preferences */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Personalized Feed for Bharat
        </h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <span>📍 Region: {region}</span>
          <span>🌐 Language: {preferredLanguage}</span>
          <span>💰 Budget: ₹{preferredBudget.toLocaleString()}</span>
          <span>📦 Showing {rerankedProducts.length} of {sampleProducts.filter(p => p.price <= preferredBudget).length} within budget</span>
        </div>
        
        {/* Liked Categories Display */}
        {likedCategories.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Liked Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {likedCategories.map((category, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  ❤️ {category}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Products Grid or No Results */}
      {rerankedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rerankedProducts.map((product) => {
            // Calculate priority score for display
            const isRegionMatch = product.region === region;
            const isLanguageMatch = product.language === preferredLanguage;
            const isPartialLanguageMatch = product.language.split('-')[0] === preferredLanguage.split('-')[0];

            return (
              <ProductCard
                key={product.id}
                product={product}
                score={product.score}
                isRegionMatch={isRegionMatch}
                isLanguageMatch={isLanguageMatch}
                isPartialLanguageMatch={isPartialLanguageMatch}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm 
                ? `No products found matching "${searchTerm}" within your budget and preferences.`
                : 'No products match your current budget and preferences.'
              }
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Debug Info (can be removed in production) */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Reranking Logic:</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Step 1: Filter products within budget (≤₹{preferredBudget.toLocaleString()})</li>
          <li>• Step 2: Filter by search term "{searchTerm || 'none'}"</li>
          <li>• Step 3: Region match: +10 points</li>
          <li>• Step 4: Language match: +8 points</li>
          <li>• Step 5: Partial language match: +4 points</li>
          <li>• Step 6: Liked category: +6 points</li>
          <li>• Step 7: Only show products with score ≥ 6</li>
        </ul>
      </div>
    </div>
  );
};

export default Feed; 