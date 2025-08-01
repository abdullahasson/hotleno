// src/components/ui/hotel-location-select.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface HotelLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  type: 'city' | 'hotel';
}

interface HotelLocationSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

// Define API response interface
interface ApiLocationItem {
  id: string;
  name: string;
  country_name: string;
  city_name?: string;
  type: string;
}

const HotelLocationSelect: React.FC<HotelLocationSelectProps> = ({ value, onChange, placeholder }) => {
  const lang = useLocale();
  const [inputValue, setInputValue] = useState('');
  const [locations, setLocations] = useState<HotelLocation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set initial value when component mounts
  useEffect(() => {
    if (value && !hasSelected) {
      setInputValue(value);
    }
  }, [value, hasSelected]);

  // Fetch locations from TravelPayouts API
  const fetchLocations = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setLocations([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://autocomplete.travelpayouts.com/places2?locale=${lang}&types[]=city&types[]=hotel&term=${searchTerm}`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data: ApiLocationItem[] = await response.json();
      
      // Transform API response - handle different response structures
      const formattedLocations: HotelLocation[] = data
        .filter((item) => item.id && item.name && item.country_name)
        .map((item) => {
          // Handle city type
          if (item.type === 'city') {
            return {
              id: item.id,
              name: item.name,
              city: item.name,
              country: item.country_name,
              type: 'city' as const
            };
          }
          // Handle hotel type
          return {
            id: item.id,
            name: item.name,
            city: item.city_name || item.name,
            country: item.country_name,
            type: 'hotel' as const
          };
        });
        
      setLocations(formattedLocations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  // Handle input changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue && !hasSelected) {
        fetchLocations(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, fetchLocations, hasSelected]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (location: HotelLocation) => {
    setInputValue(`${location.name}, ${location.country}`);
    onChange(location.id);
    setIsOpen(false);
    setHasSelected(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setHasSelected(false);
    
    // Only open dropdown if there's text in the input
    if (newValue.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setLocations([]);
    }
  };

  const handleFocus = () => {
    if (inputValue.trim()) {
      setIsOpen(true);
      if (!hasSelected) {
        fetchLocations(inputValue);
      }
    } else {
      setIsOpen(true);
    }
  };

  // Dropdown animation variants
  const dropdownVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      scale: 0.95,
      transition: { 
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-300 shadow-sm hover:shadow-md"
        />
        
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-400 max-h-96 overflow-y-auto"
          >
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-4 px-4 text-center text-gray-500 flex items-center justify-center"
              >
                <svg className="animate-spin h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Searching locations...</span>
              </motion.div>
            ) : locations.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-4 px-4 text-center text-gray-500"
              >
                {inputValue ? (
                  <div>
                    <div className="mb-2">
                      No locations found for &quot;{inputValue}&quot;
                    </div>
                    <div className="text-sm text-gray-400">
                      Try a different city or hotel name
                    </div>
                  </div>
                ) : (
                  "Start typing to search destinations"
                )}
              </motion.div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {locations.map((location) => (
                  <motion.li 
                    key={location.id}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => handleSelect(location)}
                    className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors ${
                      value === location.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          {location.type === 'hotel' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {location.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate flex items-center">
                          <span>{location.city}, {location.country}</span>
                          <span className="mx-2">•</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {location.type === 'hotel' ? 'Hotel' : 'City'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelLocationSelect;