'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from "next-intl";
import FlightList from "./FlightList";
import FlightsError from './FlightsError';
import Select from '../ui/select';
import UiDatePicker from '../ui/datepicker';
import AirportSelect from '../ui/airport-select';
import {
  ArrowRightLeft,
  User,
  X,
  Search,
  Loader2,
  Minus,
  Plus,
  XCircle,
  ArrowDown,
  ArrowUp
} from 'lucide-react';

// Types
interface FlightData {
  flight_number: string;
  link: string;
  origin_airport: string;
  destination_airport: string;
  departure_at: string;
  airline: string;
  destination: string;
  origin: string;
  price: number;
  return_transfers: number;
  duration: number;
  duration_to: number;
  duration_back: number;
  transfers: number;
}

interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

interface PassengerTypeConfig {
  text: string;
  ex: string;
}

// Define valid sortBy types
type SortByType = 'price' | 'duration' | 'departure';

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
  const t = useTranslations("SearchFlightsComponent");

  const handleChange = (type: keyof PassengerCounts, delta: number) => {
    const newValue = Math.max(0, passengers[type] + delta);

    // Apply infant limit (max 1 infant per adult)
    if (type === 'infants' && newValue > passengers.adults) return;

    onChange({ ...passengers, [type]: newValue });
  };

  // Get passenger type configurations
  const getPassengerTypeConfig = (): Record<keyof PassengerCounts, PassengerTypeConfig> => ({
    adults: {
      text: t("Passengers.Adults.Text"),
      ex: t("Passengers.Adults.EX")
    },
    children: {
      text: t("Passengers.Children.Text"),
      ex: t("Passengers.Children.EX")
    },
    infants: {
      text: t("Passengers.Infants.Text"),
      ex: t("Passengers.Infants.EX")
    }
  });

  const passengerConfig = getPassengerTypeConfig();

  return (
    <div className="absolute z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-5 w-[200%] mt-2 animate-fadeIn">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">{t("Passengers.More")}</h3>
        <button
          onClick={onClose}
          className="p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close passenger selector"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        {(['adults', 'children', 'infants'] as const).map((type) => (
          <div key={type} className="flex justify-between items-center">
            <div>
              <div className="font-medium text-gray-800">
                {passengerConfig[type].text}
              </div>
              <div className="text-sm text-gray-500">
                {passengerConfig[type].ex}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
                disabled={
                  type === 'adults' ? passengers.adults <= 1 :
                    type === 'infants' ? passengers.infants <= 0 : passengers.children <= 0
                }
                onClick={() => handleChange(type, -1)}
                aria-label={`Decrease ${type}`}
              >
                <Minus size={16} className="text-blue-500" />
              </button>
              <span className="font-medium w-6 text-center">{passengers[type]}</span>
              <button
                className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors disabled:opacity-30"
                disabled={type === 'infants' && passengers.infants >= passengers.adults}
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
export default function FlightsSearch() {
  const searchParams = useSearchParams();
  const t = useTranslations("SearchFlightsComponent");

  // State initialization
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParamsState, setSearchParamsState] = useState({
    origin: searchParams.get('origin') || 'USE',
    destination: searchParams.get('destination') || 'HKT',
    departureDate: searchParams.get('departureDate') ? new Date(searchParams.get('departureDate')!) : new Date(),
    returnDate: searchParams.get('returnDate') ? new Date(searchParams.get('returnDate')!) : null,
    tripType: (searchParams.get('tripType') || 'one-way') as 'one-way' | 'round-trip',
    directOnly: false,
    sortBy: (searchParams.get('sortBy') || 'price') as SortByType,
    currency: searchParams.get('currency') || 'USD',
    passengers: {
      adults: parseInt(searchParams.get('passengers.adults') || '1') || 1,
      children: parseInt(searchParams.get('passengers.children') || '0') || 0,
      infants: parseInt(searchParams.get('passengers.infants') || '0') || 0
    } as PassengerCounts,
    showPassengerSelect: false
  });
  const [mobileOpen , setMobileOpen] = useState(false)


  // Search function
  const searchFlights = useCallback(async () => {
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      tripType,
      directOnly,
      sortBy,
      currency,
      passengers
    } = searchParamsState;

    // Validation
    if (!origin || !destination) {
      setError('Please enter origin and destination');
      return;
    }
    if (!departureDate) {
      setError('Please select departure date');
      return;
    }
    if (tripType === 'round-trip' && !returnDate) {
      setError('Please select return date');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formatDate = (date: Date) => date.toISOString().split('T')[0];
      const params = new URLSearchParams({
        origin,
        destination,
        currency: currency.toLowerCase(),
        departure_date: formatDate(departureDate),
        direct: directOnly.toString(),
        sort: sortBy,
        limit: '20',
        adults: passengers.adults.toString(),
        children: passengers.children.toString(),
        infants: passengers.infants.toString()
      });

      if (tripType === 'round-trip' && returnDate) {
        params.append('return_date', formatDate(returnDate));
      }

      const apiUrl = `/api/aviasales/aviasales/v3/prices_for_dates?${params.toString()}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setFlights([]);
      } else {
        setFlights(data.data || []);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch flights';
      console.error('Flight search failed:', errorMessage);
      setError('Failed to fetch flights. Please try again.');
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, [searchParamsState]);

  // Initial search
  useEffect(() => {
    searchFlights();
  }, [searchFlights]);

  // Handlers
  const handleParamChange = <K extends keyof typeof searchParamsState>(
    key: K,
    value: typeof searchParamsState[K]
  ) => {
    setSearchParamsState(prev => ({ ...prev, [key]: value }));
  };

  const swapLocations = () => {
    setSearchParamsState(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const handlePassengerChange = (newPassengers: PassengerCounts) => {
    handleParamChange('passengers', newPassengers);
  };

  // Calculate total passengers
  const totalPassengers = searchParamsState.passengers.adults +
    searchParamsState.passengers.children +
    searchParamsState.passengers.infants;


  // Get trip type labels
  const getTripTypeLabels = () => ({
    'one-way': t("TripType.One"),
    'round-trip': t("TripType.Return")
  });

  // Get sort by options
  const getSortByOptions = () => [
    { value: 'price', label: t("SortBy.Price") },
    { value: 'duration', label: t("SortBy.Duration") },
    { value: 'departure', label: t("SortBy.Departure") }
  ];

  // Handle sortBy change with proper type
  const handleSortByChange = (value: string) => {
    // Validate value is a valid SortByType
    if (value === 'price' || value === 'duration' || value === 'departure') {
      handleParamChange('sortBy', value);
    }
  };

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-4 sm:mb-6 gap-4">
          {/* Trip Type Selector */}
          <div className="flex flex-1 w-full items-end p-1 pb-0 gap-2">
            {(['one-way', 'round-trip'] as const).map((type) => {
              const tripTypeLabels = getTripTypeLabels();
              return (
                <button
                  key={type}
                  type="button"
                  className={`py-2 px-4 text-center rounded-full text-sm transition-all duration-300 cursor-pointer flex-1 ${searchParamsState.tripType === type
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-md text-white font-medium'
                    : 'text-gray-500 bg-gray-200/50 hover:text-gray-700'
                    }`}
                  onClick={() => handleParamChange('tripType', type)}
                >
                  {tripTypeLabels[type]}
                </button>
              )
            })}
          </div>

          <div className="flex flex-1 w-full items-end gap-2">
            {/* Passengers */}
            <div className="relative w-full">
              <div
                className="border border-gray-200 rounded-xl py-2 pr-4 pl-10 cursor-pointer hover:border-blue-400 transition-colors duration-300 bg-white"
                onClick={() => handleParamChange('showPassengerSelect', true)}
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <User size={20} className="text-blue-500" />
                </div>
                <div className="font-medium text-gray-800">
                  {totalPassengers} {totalPassengers === 1 ? t("Passengers.One") : t("Passengers.More")}
                </div>
              </div>

              {searchParamsState.showPassengerSelect && (
                <PassengerSelector
                  passengers={searchParamsState.passengers}
                  onChange={handlePassengerChange}
                  onClose={() => handleParamChange('showPassengerSelect', false)}
                />
              )}
            </div>

            {/* Currency */}
            <Select
              options={[
                { value: 'USD', label: 'USD ($)' },
                { value: 'EUR', label: 'EUR (€)' },
                { value: 'GBP', label: 'GBP (£)' },
                { value: 'SGD', label: 'SGD (S$)' },
                { value: 'THB', label: 'THB (฿)' },
              ]}
              value={searchParamsState.currency}
              onChange={value => handleParamChange('currency', value)}
              placeholder="العملة"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-between items-stretch">
          {/* Location Inputs */}
          <div className="flex-[2] flex flex-col sm:flex-row items-center relative gap-2 sm:gap-2">
            <div className="flex-1 w-full">
              <AirportSelect
                value={''}
                onChange={value => handleParamChange('origin', value)}
                placeholder={t('Location.Origin')}
              />
            </div>

            <button
              type="button"
              onClick={swapLocations}
              className="absolute sm:static border-x-2 sm:border-x-0 border-gray-200 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:translate-y-0 bg-white z-20 p-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50 rounded-[100vmax] transition-all duration-300 self-center my-2 sm:my-0"
              aria-label="SwapLocations"
            >
              <ArrowRightLeft size={18} className="text-blue-500 rotate-90 sm:rotate-0" />
            </button>

            <div className="flex-1 w-full">
              <AirportSelect
                value={''}
                onChange={value => handleParamChange('destination', value)}
                placeholder={t('Location.Destination')}
              />
            </div>
          </div>

          {/* Date Pickers */}
          <div className="flex-[2] flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <UiDatePicker
                selected={searchParamsState.departureDate}
                onChange={date => handleParamChange('departureDate', date || new Date())}
                minDate={new Date()}
                placeholderText={t("Date.Departure")}
                className="w-full"
              />
            </div>

            {searchParamsState.tripType === 'round-trip' && (
              <div className="flex-1">
                <UiDatePicker
                  selected={searchParamsState.returnDate}
                  onChange={date => handleParamChange('returnDate', date)}
                  minDate={searchParamsState.departureDate || new Date()}
                  placeholderText={t("Date.Return")}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="flex-1 mt-2 sm:mt-0">
            <button
              onClick={searchFlights}
              disabled={loading}
              className="w-full cursor-pointer border border-blue-600 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-75"
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

        {/* Error message */}
        {error && (
          <div className="mt-4 sm:mt-5 p-4 bg-red-50 text-red-700 rounded-xl flex items-center animate-fadeIn border border-red-100">
            <XCircle className="text-red-500 mr-3" size={20} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="flex p-6 gap-6 max-[767px]:flex-col">
        <div className="flex-1">
          <div className="md:col-span-3">
            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("SortBy.Title")}</label>
              <Select
                options={getSortByOptions()}
                value={searchParamsState.sortBy}
                onChange={handleSortByChange}
                placeholder="Sort by"
              />
            </div>
          </div>
        </div>
        <div className="flex-[4]">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
            </div>
          ) : flights.length > 0 ? (
            <FlightList
              flights={flights}
              currency={searchParamsState.currency}
              destination={searchParamsState.destination}
              tripType={searchParamsState.tripType}
              returnDate={searchParamsState.returnDate}
              departureDate={searchParamsState.departureDate}
              totalPassengers={totalPassengers}
              originNow={searchParamsState.origin}
            />
          ) : !loading && (
            <FlightsError />
          )}
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}