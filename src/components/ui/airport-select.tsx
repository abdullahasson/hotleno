// React
import React, { useState, useEffect, useRef, useCallback } from 'react';
// Next Intl
import { useLocale, useTranslations } from 'next-intl';

interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

interface AirportSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

// Define API response interface
interface ApiAirportItem {
  code: string;
  name: string;
  city_name: string;
  country_name: string;
  type: string;
}

const AirportSelect: React.FC<AirportSelectProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const lang = useLocale();
  const t = useTranslations('AirportSelect');

  const [inputValue, setInputValue] = useState('');
  const [airports, setAirports] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch airports from TravelPayouts API
  const fetchAirports = useCallback(async () => {
    if (!inputValue.trim()) {
      setAirports([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://autocomplete.travelpayouts.com/places2?locale=${lang}&types[]=airport&term=${inputValue}`
      );
      const data: ApiAirportItem[] = await response.json();

      // Transform API response to our Airport structure
      const formattedAirports = data
        .filter(
          (item) =>
            item.code && item.name && item.city_name && item.country_name
        )
        .map((item) => ({
          code: item.code,
          name: item.name,
          city: item.city_name,
          country: item.country_name,
        }));

      setAirports(formattedAirports);
    } catch (error) {
      console.error('Error fetching airports:', error);
    } finally {
      setLoading(false);
    }
  }, [inputValue, lang]);

  useEffect(() => {
    // Debounce the API call
    const timer = setTimeout(() => {
      fetchAirports();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchAirports]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Set input value when a selection is made
  useEffect(() => {
    if (value && airports.length > 0) {
      const selectedAirport = airports.find((a) => a.code === value);
      if (selectedAirport) {
        setInputValue(`${selectedAirport.country}`);
      }
    }
  }, [value, airports]);

  const handleSelect = (airport: Airport) => {
    setInputValue(
      `${airport.country} - ${airport.city} - ${airport.name}`
    );
    onChange(airport.code);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  return (
    <div className={`relative w-full`} ref={containerRef}>
      <div className={`relative`}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`
            w-full rounded-xl 
            border border-gray-200 
            px-4 py-3 pl-10 
            text-lg 
            transition-all duration-300 
            hover:shadow-md 
            focus:border-transparent focus:ring-2 focus:ring-blue-500
        `}
        />

        <div className={`absolute left-3 top-1/2 -translate-y-1/2`}>
          {loading ? (
            <svg
              className={`h-5 w-5 animate-spin text-gray-400`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className={`opacity-25`}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className={`opacity-75`}
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <></>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className={`absolute z-10 mt-1 max-h-60 w-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg`}
        >
          {loading ? (
            <div className={`px-4 py-4 text-center text-gray-500`}>
              {t('Loading')}
            </div>
          ) : airports.length === 0 ? (
            <div className={`px-4 py-4 text-center text-gray-500`}>
              {inputValue ? t('NoResults') : t('Not')}
            </div>
          ) : (
            <ul className={`divide-y divide-gray-100`}>
              {airports.map((airport) => (
                <li
                  key={airport.code}
                  onClick={() => handleSelect(airport)}
                  className={`cursor-pointer px-4 py-3 transition-colors hover:bg-blue-50 ${
                    value === airport.code ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className={`flex items-center justify-between`}>
                    <div
                      className={`flex flex-col items-start gap-0`}
                    >
                      <div
                        className={`truncate font-medium text-gray-900`}
                      >
                        <span className={`text-blue-600`}>
                          {airport.country}
                        </span>
                      </div>
                      <div className={`truncate text-gray-700`}>
                        {airport.city}
                      </div>
                    </div>
                    <div
                      className={`mb-2 truncate text-sm text-gray-500`}
                    >
                      {airport.name}
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800`}
                      >
                        {airport.code}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AirportSelect;