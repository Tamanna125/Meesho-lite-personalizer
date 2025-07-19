import React from 'react';
import { useUserSession } from '../store/userSession';

const BudgetSlider: React.FC = () => {
  const { preferredBudget, setPreferredBudget } = useUserSession();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Budget Preference
        </h3>
        <div className="text-2xl font-bold text-blue-600">
          {formatCurrency(preferredBudget)}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹500</span>
          <span>₹5000</span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={preferredBudget}
            onChange={(e) => setPreferredBudget(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((preferredBudget - 500) / (5000 - 500)) * 100}%, #E5E7EB ${((preferredBudget - 500) / (5000 - 500)) * 100}%, #E5E7EB 100%)`
            }}
          />
          
          {/* Custom slider thumb */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200"
            style={{
              left: `${((preferredBudget - 500) / (5000 - 500)) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>Min Budget</span>
          <span>Max Budget</span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          Products within your budget will be prioritized in the feed.
        </p>
      </div>
    </div>
  );
};

export default BudgetSlider; 