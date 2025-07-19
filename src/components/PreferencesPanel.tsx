import React, { useState } from 'react';
import { useUserSession } from '../store/userSession';

interface LanguageOption {
  value: string;
  label: string;
  nativeName: string;
}

interface RegionOption {
  value: string;
  label: string;
}

const languageOptions: LanguageOption[] = [
  { value: 'hi-IN', label: 'Hindi', nativeName: 'हिंदी' },
  { value: 'en-US', label: 'English', nativeName: 'English' },
  { value: 'ta-IN', label: 'Tamil', nativeName: 'தமிழ்' },
  { value: 'bn-IN', label: 'Bengali', nativeName: 'বাংলা' },
  { value: 'te-IN', label: 'Telugu', nativeName: 'తెలుగు' },
  { value: 'mr-IN', label: 'Marathi', nativeName: 'मराठी' },
  { value: 'gu-IN', label: 'Gujarati', nativeName: 'ગુજરાતી' },
  { value: 'kn-IN', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { value: 'ml-IN', label: 'Malayalam', nativeName: 'മലയാളം' },
  { value: 'pa-IN', label: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
];

const regionOptions: RegionOption[] = [
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'Kolkata', label: 'Kolkata' },
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Ahmedabad', label: 'Ahmedabad' },
  { value: 'Jaipur', label: 'Jaipur' },
  { value: 'Lucknow', label: 'Lucknow' }
];

const PreferencesPanel: React.FC = () => {
  const { 
    preferredLanguage, 
    region, 
    setPreferredLanguage, 
    setRegion 
  } = useUserSession();

  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferredLanguage(event.target.value);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.target.value);
  };

  const getCurrentLanguageLabel = () => {
    const currentLang = languageOptions.find(lang => lang.value === preferredLanguage);
    return currentLang ? `${currentLang.label} (${currentLang.nativeName})` : preferredLanguage;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2">⚙️</span>
          Preferences
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>

      {/* Current Values Display */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <span className="text-gray-600 w-16">🌐</span>
            <span className="font-medium text-gray-900">
              {getCurrentLanguageLabel()}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 w-16">📍</span>
            <span className="font-medium text-gray-900">{region}</span>
          </div>
        </div>
      </div>

      {/* Preferences Form */}
      {isOpen && (
        <div className="space-y-4">
          {/* Language Selection */}
          <div>
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Language
            </label>
            <select
              id="language-select"
              value={preferredLanguage}
              onChange={handleLanguageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.nativeName})
                </option>
              ))}
            </select>
          </div>

          {/* Region Selection */}
          <div>
            <label htmlFor="region-select" className="block text-sm font-medium text-gray-700 mb-2">
              Region
            </label>
            <select
              id="region-select"
              value={region}
              onChange={handleRegionChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Live Update Indicator */}
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center text-sm text-green-800">
              <span className="mr-2">✓</span>
              <span>Preferences updated live - feed will rerank automatically</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile-friendly toggle hint */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {isOpen ? 'Hide preferences' : 'Change preferences'}
        </button>
      </div>
    </div>
  );
};

export default PreferencesPanel; 