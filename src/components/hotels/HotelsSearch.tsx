// components/HotelsSearch.tsx
'use client';

// Next
import { useSearchParams } from 'next/navigation';
// React
import { useState, useEffect, useCallback } from 'react';
// Components
import HotelList from "./HotelList";
import HotelError from './HotelError';
import UiDatePicker from '../ui/datepicker';
import {
  User,
  Search,
  Loader2,
  Minus,
  Plus,
  XCircle,
  MapPin,
  ArrowDown,
  ArrowUp
} from 'lucide-react';

// Types
export type Hotel = {
  hotelId: number;
  hotelName: string;
  location: {
    name: string;
    country: string;
  };
  priceAvg: number;
  pricePercentile: Record<string, number>;
  stars: number;
  locationId: number;
  imageUrl: string;
};

interface PassengerCounts {
  adults: number;
  children: number;
}

// Passenger Selector Component
const PassengerSelector = ({
  passengers,
  onChange,
  onClose
}: {
  passengers: PassengerCounts;
  onChange: (newPassengers: PassengerCounts) => void;
  onClose: () => void;
}) => {
  const handleChange = (type: keyof PassengerCounts, delta: number) => {
    const newValue = Math.max(0, passengers[type] + delta);
    onChange({ ...passengers, [type]: newValue });
  };

  return (
    <div className="absolute z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-5 w-[200%] mt-2 animate-fadeIn">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Guests</h3>
        <button
          onClick={onClose}
          className="p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close guest selector"
        >
          <XCircle size={18} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        {(['adults', 'children'] as const).map((type) => (
          <div key={type} className="flex justify-between items-center">
            <div>
              <div className="font-medium text-gray-800">
                {type === 'adults' ? 'Adults' : 'Children'}
              </div>
              <div className="text-sm text-gray-500">
                {type === 'adults' ? 'Age 13+ years' : 'Ages 2-12 years'}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
                disabled={passengers[type] <= 0}
                onClick={() => handleChange(type, -1)}
                aria-label={`Decrease ${type}`}
              >
                <Minus size={16} className="text-blue-500" />
              </button>
              <span className="font-medium w-6 text-center">{passengers[type]}</span>
              <button
                className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
                onClick={() => handleChange(type, 1)}
                aria-label={`Increase ${type}`}
              >
                <Plus size={16} className="text-blue-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function HotelsSearch() {
  const searchParams = useSearchParams();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // State initialization
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParamsState, setSearchParamsState] = useState({
    location: searchParams.get('location') || 'New York',
    checkIn: searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')!) : today,
    checkOut: searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')!) : tomorrow,
    passengers: {
      adults: parseInt(searchParams.get('passengers.adults') || '1') || 1,
      children: parseInt(searchParams.get('passengers.children') || '0') || 0,
    } as PassengerCounts,
    showPassengerSelect: false
  });
  const [mobileOpen , setMobileOpen] = useState(false)

  // Search function
  const searchHotels = useCallback(async () => {
    const {
      location,
      checkIn,
      checkOut,
      passengers
    } = searchParamsState;

    // Validation
    if (!location) {
      setError('Please enter a destination');
      return;
    }
    if (!checkIn) {
      setError('Please select check-in date');
      return;
    }
    if (!checkOut) {
      setError('Please select check-out date');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formatDate = (date: Date) => date.toISOString().split('T')[0];
      const params = new URLSearchParams({
        location,
        checkIn: formatDate(checkIn),
        checkOut: formatDate(checkOut),
        adults: passengers.adults.toString(),
      });

      const apiUrl = `/api/search?${params.toString()}`;
      const res = await fetch(apiUrl);
      
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      const data: Hotel[] = await res.json();
      setHotels(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch hotels';
      setError(errorMessage);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  }, [searchParamsState]);

  // Initial search
  useEffect(() => {
    searchHotels();
  }, [searchHotels]);

  // Handlers
  const handleParamChange = <K extends keyof typeof searchParamsState>(
    key: K,
    value: typeof searchParamsState[K]
  ) => {
    setSearchParamsState(prev => ({ ...prev, [key]: value }));
  };

  // Calculate total guests
  const totalGuests = searchParamsState.passengers.adults +
    searchParamsState.passengers.children;

  return (
    <div>
      <div className="selcon-btn" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <ArrowUp /> : <ArrowDown />}
      </div>

      {/* Search Form */}
      <div className={`
        bg-white 
        w-full 
        shadow-xl 
        p-4 sm:p-6 
        border-b border-gray-100 
        sticky 
        top-0 
        z-30
        selcon
        ${mobileOpen ? 'selcon-open' : ''}
      `}>
        <div className="flex flex-col sm:flex-row gap-5 sm:justify-between sm:items-center">
          {/* Location Input */}
          <div className="w-full sm:flex-[2] flex items-center relative">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={20} className="text-blue-500" />
              </div>
              <input
                type="text"
                value={searchParamsState.location}
                onChange={(e) => handleParamChange('location', e.target.value)}
                placeholder="City or Hotel"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Date Pickers */}
          <div className="w-full sm:flex-[2] flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <UiDatePicker
                selected={searchParamsState.checkIn}
                onChange={date => handleParamChange('checkIn', date || today)}
                minDate={today}
                placeholderText="Check-in"
                className="w-full"
              />
            </div>

            <div className="flex-1 relative">
              <UiDatePicker
                selected={searchParamsState.checkOut}
                onChange={date => handleParamChange('checkOut', date || tomorrow)}
                minDate={searchParamsState.checkIn || tomorrow}
                placeholderText="Check-out"
                className="w-full"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="w-full sm:flex-1 relative">
            <div
              className="border border-gray-200 rounded-xl py-3 pr-4 pl-10 cursor-pointer hover:border-blue-400 transition-colors duration-300 bg-white"
              onClick={() => handleParamChange('showPassengerSelect', true)}
            >
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <User size={20} className="text-blue-500" />
              </div>
              <div className="font-medium text-gray-800">
                {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
              </div>
            </div>

            {searchParamsState.showPassengerSelect && (
              <PassengerSelector
                passengers={searchParamsState.passengers}
                onChange={(newPassengers) => handleParamChange('passengers', newPassengers)}
                onClose={() => handleParamChange('showPassengerSelect', false)}
              />
            )}
          </div>

          {/* Search Button */}
          <div className="w-full sm:w-auto">
            <button
              onClick={searchHotels}
              disabled={loading}
              className="w-full cursor-pointer border border-blue-600 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-75"
            >
              {loading ? (
                <Loader2 className="animate-spin h-6 w-6" />
              ) : (
                <div className="flex items-center">
                  <Search size={20} />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-5 p-4 bg-red-50 text-red-700 rounded-xl flex items-center animate-fadeIn border border-red-100">
            <XCircle className="text-red-500 mr-3" size={20} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="p-6">        
        <div>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
            </div>
          ) : hotels.length > 0 ? (
            <HotelList 
              hotels={hotels}
              location={searchParamsState.location}
              checkIn={searchParamsState.checkIn.toISOString()}
              checkOut={searchParamsState.checkOut.toISOString()}
              adults={searchParamsState.passengers.adults}
            />
          ) : !loading && (
            <HotelError />
          )}
        </div>
      </div>
    </div>
  );
}