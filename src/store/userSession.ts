import { create } from 'zustand';

interface UserSession {
  // State
  preferredLanguage: string;
  region: string;
  likedCategories: string[];
  preferredBudget: number;
  searchTerm: string;
  
  // Actions
  setPreferredLanguage: (language: string) => void;
  setRegion: (region: string) => void;
  toggleLikedCategory: (category: string) => void;
  removeLikedCategory: (category: string) => void;
  clearLikedCategories: () => void;
  setPreferredBudget: (budget: number) => void;
  setSearchTerm: (term: string) => void;
  resetSession: () => void;
}

// Helper functions for localStorage
const STORAGE_KEY = 'meesho-lite-user-session';

const loadFromStorage = (): Partial<UserSession> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to load user session from localStorage:', error);
    return {};
  }
};

const saveToStorage = (state: Partial<UserSession>) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save user session to localStorage:', error);
  }
};

export const useUserSession = create<UserSession>((set, get) => {
  // Load initial state from localStorage
  const storedState = loadFromStorage();
  
  const initialState = {
    preferredLanguage: storedState.preferredLanguage || (typeof navigator !== 'undefined' ? navigator.language : 'en-US'),
    region: storedState.region || 'Delhi',
    likedCategories: storedState.likedCategories || [],
    preferredBudget: storedState.preferredBudget || 2000,
    searchTerm: storedState.searchTerm || '',
  };

  return {
    // Initial state
    ...initialState,
    
    // Actions
    setPreferredLanguage: (language: string) => 
      set((state) => {
        const newState = { ...state, preferredLanguage: language };
        saveToStorage(newState);
        return newState;
      }),
    
    setRegion: (region: string) => 
      set((state) => {
        const newState = { ...state, region };
        saveToStorage(newState);
        return newState;
      }),
    
    toggleLikedCategory: (category: string) => 
      set((state) => {
        const isLiked = state.likedCategories.includes(category);
        let newLikedCategories: string[];
        
        if (isLiked) {
          // Remove category if already liked
          newLikedCategories = state.likedCategories.filter(cat => cat !== category);
        } else {
          // Add category if not liked
          newLikedCategories = [...state.likedCategories, category];
        }
        
        const newState = { ...state, likedCategories: newLikedCategories };
        saveToStorage(newState);
        return newState;
      }),
    
    removeLikedCategory: (category: string) => 
      set((state) => {
        const newState = {
          ...state,
          likedCategories: state.likedCategories.filter(cat => cat !== category)
        };
        saveToStorage(newState);
        return newState;
      }),
    
    clearLikedCategories: () => 
      set((state) => {
        const newState = { ...state, likedCategories: [] };
        saveToStorage(newState);
        return newState;
      }),
    
    setPreferredBudget: (budget: number) => 
      set((state) => {
        const newState = { ...state, preferredBudget: budget };
        saveToStorage(newState);
        return newState;
      }),
    
    setSearchTerm: (term: string) => 
      set((state) => {
        const newState = { ...state, searchTerm: term };
        saveToStorage(newState);
        return newState;
      }),
    
    resetSession: () => {
      const defaultState = {
        preferredLanguage: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
        region: 'Delhi',
        likedCategories: [],
        preferredBudget: 2000,
        searchTerm: ''
      };
      
      set(defaultState);
      saveToStorage(defaultState);
    }
  };
}); 