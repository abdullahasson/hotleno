'use client';

// React
import { useState, useEffect, useRef, useCallback } from 'react';
// Next Intl
import { useLocale } from "next-intl";
// Icons
import { Loader2, MapPin } from 'lucide-react';

interface LocationSuggestion {
  id: number;
  name: string;
  city_name: string;
  country_name: string;
  country_code: string;
  type: string;
}

interface LocationAutocompleteProps {
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function LocationAutocomplete({
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Search locations...'
}: LocationAutocompleteProps) {

  const lang = useLocale();
  const isControlled = value !== undefined;
  const [inputValue, setInputValue] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with parent value (controlled mode)
  useEffect(() => {
    if (isControlled) {
      setInputValue(value);
    }
  }, [value, isControlled]);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(query)}&locale=${lang}&types[]=city`
      );
      const data = await res.json();
      setSuggestions(data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch location suggestions', error);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSuggestions(inputValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, fetchSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (suggestion: LocationSuggestion) => {
    const newValue = suggestion.name;
    setInputValue(newValue);
    onChange(newValue);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    if (inputValue) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="flex items-center gap-2 py-3 px-2 rounded-xl border border-gray-400">
        <MapPin size={20} className="text-blue-500" />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
        />
        {loading && <Loader2 className="animate-spin h-5 w-5 text-blue-500" />}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white divide-y divide-gray-200 border border-gray-400 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors flex gap-3 items-center"
              onClick={() => handleSelect(suggestion)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <MapPin size={16} className="text-blue-500 mr-2 flex-shrink-0" />
              <div className="truncate text-start">
                <div className="font-medium text-gray-800">
                  {suggestion.city_name || suggestion.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {suggestion.country_name}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showSuggestions && !loading && suggestions.length === 0 && inputValue && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-400 rounded-xl shadow-lg p-4 text-center text-gray-500">
          No locations found
        </div>
      )}
    </div>
  );
}