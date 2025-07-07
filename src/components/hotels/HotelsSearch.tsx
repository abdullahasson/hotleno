'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from "next-intl";
import HotelList from "./HotelList";
import HotelsError from './HotelsError';
import Select from '../ui/select';
import UiDatePicker from '../ui/datepicker';
import LocationAutocomplete from '../ui/location-autocomplete';
import {
  User,
  X,
  Search,
  Loader2,
  Minus,
  Plus,
  XCircle,
  MapPin
} from 'lucide-react';

interface HotelData {
  id: number;
  name: string;
  stars: number;
  price: number;
  location: {
    name: string;
    country: string;
  };
  checkIn: string;
  checkOut: string;
  imageUrl: string;
  rating: number;
  amenities: string[];
  link: string;
}

interface GuestConfig {
  adults: number;
  children: number;
  rooms: number;
}

export default function HotelsSearch() {
  const searchParams = useSearchParams();
  const t = useTranslations("SearchHotelsComponent");

  // Helper functions for parsing URL parameters
  const parseParam = (key: string, defaultValue: string): string => {
    return searchParams.get(key) ?? defaultValue;
  };

  const parseDate = (key: string, defaultValue: Date): Date => {
    const value = searchParams.get(key);
    return value ? new Date(value) : defaultValue;
  };

  const parseNumber = (key: string, defaultValue: number): number => {
    const value = searchParams.get(key);
    return value ? parseInt(value, 10) : defaultValue;
  };

  // State initialization
  const [searchParamsState, setSearchParamsState] = useState({
    location: parseParam('location', ''),
    checkIn: parseDate('checkIn', new Date()),
    checkOut: parseDate('checkOut', new Date(Date.now() + 86400000 * 3)),
    guests: {
      adults: parseNumber('adults', 2),
      children: parseNumber('children', 0),
      rooms: parseNumber('rooms', 1)
    } as GuestConfig,
    sortBy: parseParam('sortBy', 'popularity') as 'price' | 'rating' | 'popularity',
    currency: parseParam('currency', 'USD'),
    showGuestSelect: false
  });

  const [hotels, setHotels] = useState<HotelData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchHotels = useCallback(async () => {
    const { location, checkIn, checkOut, guests, sortBy, currency } = searchParamsState;

    // Validation
    if (!location) {
      setError(t('Errors.LocationRequired'));
      return;
    }
    if (!checkIn || !checkOut) {
      setError(t('Errors.DatesRequired'));
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formatDate = (date: Date) => date.toISOString().split('T')[0];
      const params = new URLSearchParams({
        location,
        currency: currency.toLowerCase(),
        checkIn: formatDate(checkIn),
        checkOut: formatDate(checkOut),
        adults: guests.adults.toString(),
        children: guests.children.toString(),
        rooms: guests.rooms.toString(),
        sort: sortBy,
        limit: '10'
      });

      const apiUrl = `/api/travelpayouts/hotels?${params.toString()}`;
      const res = await fetch(apiUrl);
      
      // Handle non-JSON responses
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error(`API returned ${res.status} status with content: ${text.slice(0, 100)}`);
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setHotels([]);
      } else {
        setHotels(data.data || []);
      }
    } catch (err: unknown) {  // Fixed: Add type annotation to catch clause
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch hotels';
      console.error('Hotel search failed:', errorMessage);
      
      // Handle specific HTML response error
      if (errorMessage.includes('Unexpected token') && errorMessage.includes('<!DOCTYPE')) {
        setError('The server returned an HTML page instead of data. Check API configuration.');
      } else {
        setError(t('Errors.General'));
      }
      
      setHotels([]);
    } finally {
      setLoading(false);
    }
  }, [searchParamsState, t]);

  useEffect(() => {
    if (searchParamsState.location) {
      searchHotels();
    }
  }, [searchHotels, searchParamsState.location]);

  const handleParamChange = <K extends keyof typeof searchParamsState>(
    key: K,
    value: typeof searchParamsState[K]
  ) => {
    setSearchParamsState(prev => ({ ...prev, [key]: value }));
  };

  const GuestSelector = () => {
    const handleChange = (type: keyof GuestConfig, delta: number) => {
      const newValue = Math.max(0, searchParamsState.guests[type] + delta);
      const newGuests = { ...searchParamsState.guests, [type]: newValue };
      
      if (type === 'rooms' && newValue > newGuests.adults) {
        newGuests.adults = newValue;
      }
      
      handleParamChange('guests', newGuests);
    };

    return (
      <div className="absolute z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-5 w-[200%] mt-2 animate-fadeIn">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">{t("Guests.Title")}</h3>
          <button
            onClick={() => handleParamChange('showGuestSelect', false)}
            className="p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close guest selector"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          {(['adults', 'children', 'rooms'] as const).map((type) => (
            <div key={type} className="flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-800">
                  {t(`Guests.${type.charAt(0).toUpperCase() + type.slice(1)}`)}
                </div>
                {type === 'rooms' && (
                  <div className="text-sm text-gray-500">
                    {t("Guests.RoomsHint")}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
                  disabled={searchParamsState.guests[type] <= (type === 'rooms' ? 1 : 0)}
                  onClick={() => handleChange(type, -1)}
                  aria-label={`Decrease ${type}`}
                >
                  <Minus size={16} className="text-blue-500" />
                </button>
                <span className="font-medium w-6 text-center">{searchParamsState.guests[type]}</span>
                <button
                  className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors disabled:opacity-30"
                  disabled={type === 'rooms' && searchParamsState.guests[type] >= 8}
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

  const totalGuests = searchParamsState.guests.adults + searchParamsState.guests.children;

  const getSortByOptions = () => [
    { value: 'price', label: t("SortBy.Price") },
    { value: 'rating', label: t("SortBy.Rating") },
    { value: 'popularity', label: t("SortBy.Popularity") }
  ];

  return (
    <div>
      <div className="bg-white w-full shadow-xl p-6 border-b border-gray-100 sticky top-0 z-30">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-1/3">
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 hover:border-blue-400 transition-colors">
              <MapPin size={20} className="text-blue-500 mr-2" />
              <LocationAutocomplete
                value={searchParamsState.location}
                onChange={value => handleParamChange('location', value)}
                placeholder={t('Location.Placeholder')}
              />
            </div>
          </div>

          <div className="w-full md:w-1/3 flex gap-2">
            <div className="w-1/2">
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 hover:border-blue-400 transition-colors">
                <UiDatePicker
                  selected={searchParamsState.checkIn}
                  onChange={date => handleParamChange('checkIn', date || new Date())}
                  minDate={new Date()}
                  placeholderText={t("Date.CheckIn")}
                  className="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
            </div>

            <div className="w-1/2">
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 hover:border-blue-400 transition-colors">
                <UiDatePicker
                  selected={searchParamsState.checkOut}
                  onChange={date => handleParamChange('checkOut', date || new Date(Date.now() + 86400000 * 3))}
                  minDate={searchParamsState.checkIn || new Date()}
                  placeholderText={t("Date.CheckOut")}
                  className="w-full bg-transparent border-none focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex gap-2">
            <div className="relative flex-1">
              <div
                className="flex items-center border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => handleParamChange('showGuestSelect', true)}
              >
                <User size={20} className="text-blue-500 mr-2" />
                <div className="font-medium text-gray-800">
                  {totalGuests} {t("Guests.Label")}, {searchParamsState.guests.rooms} {t("Guests.Rooms")}
                </div>
              </div>
              {searchParamsState.showGuestSelect && <GuestSelector />}
            </div>

            <div className="flex items-center gap-2">
              <Select
                options={[
                  { value: 'USD', label: 'USD ($)' },
                  { value: 'EUR', label: 'EUR (€)' },
                  { value: 'GBP', label: 'GBP (£)' },
                  { value: 'THB', label: 'THB (฿)' },
                ]}
                value={searchParamsState.currency}
                onChange={value => handleParamChange('currency', value)}
                placeholder="Currency"
                className="min-w-[120px]"
              />
              
              <button
                onClick={searchHotels}
                disabled={loading}
                className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-75"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-6 w-6" />
                ) : (
                  <div className="flex items-center">
                    <Search size={20} className="mr-2" />
                    <span className="font-medium">{t("SearchButton")}</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-xl flex items-center animate-fadeIn border border-red-100">
            <XCircle className="text-red-500 mr-3" size={20} />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row p-6 gap-6">
        <div className="w-full md:w-1/4">
          <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("SortBy.Title")}</label>
            <Select
              options={getSortByOptions()}
              value={searchParamsState.sortBy}
              // Fixed: Added proper type assertion
              onChange={value => handleParamChange('sortBy', value as 'price' | 'rating' | 'popularity')}
              placeholder="Sort by"
            />
          </div>
        </div>
        
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
            </div>
          ) : hotels.length > 0 ? (
            <HotelList
              hotels={hotels}
              currency={searchParamsState.currency}
              checkIn={searchParamsState.checkIn}
              checkOut={searchParamsState.checkOut}
              guests={searchParamsState.guests}
            />
          ) : !loading && (
            <HotelsError />
          )}
        </div>
      </div>
    </div>
  );
}