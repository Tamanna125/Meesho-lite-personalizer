import React from 'react';
import logo from './logo.svg';
import Feed from './components/Feed';
import PreferencesPanel from './components/PreferencesPanel';
import LikedCategoriesBar from './components/LikedCategoriesBar';
import BudgetSlider from './components/BudgetSlider';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <img src={logo} className="h-12 w-12 animate-spin" alt="logo" />
            <h1 className="ml-4 text-3xl font-bold text-gray-900">
              MeeshoLite Personalizer
            </h1>
          </div>
        </div>
      </header>
      <main>
        {/* Preferences Panel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PreferencesPanel />
        </div>
        
        {/* Budget Slider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BudgetSlider />
        </div>
        
        {/* Liked Categories Bar */}
        <LikedCategoriesBar />
        
        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
        
        {/* Feed */}
        <Feed />
      </main>
    </div>
  );
}

export default App;
