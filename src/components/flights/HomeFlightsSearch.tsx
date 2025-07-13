'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getDestinationByCode } from "@/constants/mock-data"
import Select from '../ui/select';
import UiDatePicker from '../ui/datepicker';
import AirportSelect from '../ui/airport-select'; // Changed from SelectCountry to AirportSelect
import {
  ArrowRightLeft,
  User,
  X,
  Search,
  Minus,
  Plus,
  XCircle,
  Plane
} from 'lucide-react';


// Define form state types
type TripType = 'one-way' | 'round-trip' | 'return';
type SortBy = 'price' | 'duration' | 'departure';

interface HomeFlightsSearchProps {
  position: string;
  destinationCode?: string;
  originCode?: string;
}

export default function HomeFlightsSearch({
  position = 'tab',
  destinationCode = '',
  originCode = '',
}: HomeFlightsSearchProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("SearchFlightsComponent");

  // Form state
  const [formState, setFormState] = useState({
    origin: '',
    destination: '',
    departureDate: new Date() as Date | null,
    returnDate: null as Date | null,
    tripType: 'one-way' as TripType,
    directOnly: false,
    sortBy: 'price' as SortBy,
    currency: 'USD',
    passengers: { adults: 1, children: 0, infants: 0 }
  });

  // UI state
  const [uiState, setUiState] = useState({
    showAdvanced: false,
    showPassengerSelect: false,
    error: ''
  });

  // Handle input changes with proper typing
  const handleInputChange = <K extends keyof typeof formState>(
    field: K,
    value: typeof formState[K]
  ) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'tripType' && value === 'one-way' ? { returnDate: null } : {})
    }));
  };

  // Handle passenger changes
  const handlePassengerChange = (type: keyof typeof formState.passengers, delta: number) => {
    setFormState(prev => ({
      ...prev,
      passengers: {
        ...prev.passengers,
        [type]: Math.max(0, prev.passengers[type] + delta)
      }
    }));
  };

  // Swap origin and destination
  const swapLocations = () => {
    setFormState(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  // Form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { origin, destination, departureDate, tripType, returnDate } = formState;

    // Validation
    if (!origin || !destination) {
      setUiState(prev => ({ ...prev, error: t("Error.origin") }));
      return;
    }

    if (!departureDate) {
      setUiState(prev => ({ ...prev, error: t("Error.departureDate") }));
      return;
    }

    if (tripType === 'round-trip' && !returnDate) {
      setUiState(prev => ({ ...prev, error: t("Error.returnDate") }));
      return;
    }

    setUiState(prev => ({ ...prev, error: '' }));

    // Format dates
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const params = new URLSearchParams({
      origin,
      destination,
      currency: formState.currency.toLowerCase(),
      departure_date: formatDate(departureDate),
      direct: formState.directOnly.toString(),
      sort: formState.sortBy,
      limit: '20',
      adults: formState.passengers.adults.toString(),
      children: formState.passengers.children.toString(),
      infants: formState.passengers.infants.toString()
    });

    if (tripType === 'round-trip' && returnDate) {
      params.append('return_date', formatDate(returnDate));
    }

    router.push(`/${locale}/flights?${params.toString()}`);
  };

  // Calculate total passengers
  const totalPassengers = Object.values(formState.passengers).reduce((a, b) => a + b, 0);

  return (
    <div className="flex-1">
      <form
        onSubmit={handleSubmit}
        className={`
          bg-white 
          w-full 
          ${position === 'flights-to' ? 'rounded-3xl relative' : 'rounded-b-3xl '}
          shadow-2xl 
          px-8 pb-8 pt-4 max-[767px]:p-6 
          border border-gray-100
        `}
      >
        {
          position === 'flights-to' ? (
            <div className="text-gray-900 flex items-center absolute z-20 top-0 left-1/2 -translate-x-1/2 -translate-y-3/4 shadow-md bg-white rounded-[100vmax] p-3 text-center">
              <div className="bg-gray-100 p-2 rounded-full">
                <Plane size={24} className="text-blue-600" />
              </div>
              <span className="px-2">
                {t('flightsTo', { destination: getDestinationByCode(destinationCode)?.formattedName })}
              </span>
            </div>
          ) : null
        }
        {/* Trip Type Selector */}
        <div className="flex p-1 pb-0 gap-2 max-[767px]:gap-1 max-[767px]:justify-center">
          {(['one-way', 'return', 'round-trip'] as const).map((type) => (
            <button
              key={type}
              type="button"
              className={`py-2 px-4 text-center rounded-full text-sm transition-all duration-300 cursor-pointer max-[767px]:px-2 ${formState.tripType === type
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-md text-white font-medium'
                : 'text-gray-500 bg-gray-200/50 hover:text-gray-700'
                }`}
              onClick={() => handleInputChange('tripType', type)}
            >
              {t(`TripType.${type === 'one-way' ? 'One' : type === 'return' ? 'Return' : 'RoundTrip'}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-5 max-[767px]:gap-2 max-[767px]:flex-col max-[767px]:w-full mt-4 mb-4 max-[767px]:mb-2">
          {/* Location Inputs */}
          <div className="flex-1 max-[767px]:flex-col max-[767px]:w-full relative flex items-center gap-2">
            <div className="flex-1 relative max-[767px]:w-full max-[767px]:mx-auto !text-gray-900">
              <AirportSelect
                value={formState.origin}
                onChange={(value) => handleInputChange('origin', value)}
                placeholder={t('Location.Origin')}
                defaultValue={originCode}
              />
            </div>

            <button
              type="button"
              onClick={swapLocations}
              className="absolute border-x-2 border-gray-200 left-1/2 top-1/2 -translate-1/2 bg-white z-20 max-[767px]:left-0 max-[767px]:m-0 max-[767px]:top-1/2 max-[767px]:-translate-y-1/2 max-[767px]:z-20 p-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50 rounded-[100vmax] transition-all duration-300"
              aria-label="SwapLocations"
            >
              <ArrowRightLeft size={18} className="text-blue-500" />
            </button>

            <div className="flex-1 relative max-[767px]:w-full max-[767px]:mx-auto !text-gray-900 max-[767px]:rounded-none">
              {/* Replaced SelectCountry with AirportSelect */}
              <AirportSelect
                value={formState.destination}
                onChange={(value) => handleInputChange('destination', value)}
                placeholder={t('Location.Destination')}
                defaultValue={destinationCode}
              />
            </div>
          </div>

          {/* Date Pickers */}
          <div className="flex-1 flex gap-2 max-[767px]:flex-col max-[767px]:w-full">
            <div className="flex-1 relative">
              <UiDatePicker
                selected={formState.departureDate}
                onChange={(date) => handleInputChange('departureDate', date)}
                minDate={new Date()}
                placeholderText={t("Date.Departure")}
                className="w-full"
              />
            </div>

            {formState.tripType === 'return' && (
              <div className="flex-1 relative">
                <UiDatePicker
                  selected={formState.returnDate}
                  onChange={(date) => handleInputChange('returnDate', date)}
                  minDate={formState.departureDate || new Date()}
                  placeholderText={t("Date.Return")}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between max-[767px]:flex-col max-[767px]:w-full max-[767px]:gap-2 max-[767px]:items-start w-full">
          {/* Direct flights */}
          <div className="flex items-center pl-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="direct"
                checked={formState.directOnly}
                onChange={(e) => handleInputChange('directOnly', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-400 cursor-pointer"
              />
              <label htmlFor="direct" className="mx-2 block text-sm font-medium text-gray-700 cursor-pointer">
                {t("Direct")}
              </label>
            </div>
          </div>


          <div className="flex items-center gap-2 max-[767px]:flex-col max-[767px]:w-full max-[767px]:items-start">
            {/* Currency */}
            <div className="relative max-[767px]:w-full">
              <Select
                options={[
                  { value: 'USD', label: 'USD ($)' },
                  { value: 'EUR', label: 'EUR (€)' },
                  { value: 'GBP', label: 'GBP (£)' },
                  { value: 'SGD', label: 'SGD (S$)' },
                  { value: 'THB', label: 'THB (฿)' },
                ]}
                value={formState.currency}
                onChange={(value) => handleInputChange('currency', value)}
                placeholder="Currency"
              />
            </div>

            {/* Sort by */}
            <div className="relative max-[767px]:w-full">
              <Select
                options={[
                  { value: 'price', label: t("SortBy.Price") },
                  { value: 'duration', label: t("SortBy.Duration") },
                  { value: 'departure', label: t("SortBy.Departure") },
                ]}
                value={formState.sortBy}
                onChange={(value) => handleInputChange('sortBy', value as SortBy)}
                placeholder="SortBy"
              />
            </div>


            {/* Passengers */}
            <div className="relative max-[767px]:w-full">
              <div
                className="border border-gray-200 rounded-xl px-4 py-2 pl-12 cursor-pointer transition-colors duration-300 bg-white hover:shadow-md"
                onClick={() => setUiState(prev => ({ ...prev, showPassengerSelect: !prev.showPassengerSelect }))}
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <User size={20} className="text-blue-500" />
                </div>
                <div className="font-medium text-gray-800">
                  {totalPassengers} {totalPassengers === 1 ? t("Passengers.One") : t("Passengers.More")}
                </div>
              </div>

              {uiState.showPassengerSelect && (
                <PassengerSelector
                  passengers={formState.passengers}
                  onChange={handlePassengerChange}
                  onClose={() => setUiState(prev => ({ ...prev, showPassengerSelect: false }))}
                />
              )}
            </div>

            {/* Search Button */}
            <div className="max-[767px]:w-full">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-full max-[767px]:rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2">
                  <Search size={20} className="" />
                  <span className="font-medium">{t("SearchButton")}</span>
                </div>
              </button>
            </div>
          </div>
        </div>


        {/* Error message */}
        {uiState.error && (
          <div className="mt-5 p-4 bg-red-50 text-red-700 rounded-xl flex items-center animate-fadeIn border border-red-100">
            <XCircle className="text-red-500" size={20} />
            <span className="mx-2">{uiState.error}</span>
          </div>
        )}
      </form>
    </div>
  );
}



// Passenger Selector Component (unchanged)
const PassengerSelector = ({
  passengers,
  onChange,
  onClose
}: {
  passengers: { adults: number; children: number; infants: number };
  onChange: (type: 'adults' | 'children' | 'infants', delta: number) => void;
  onClose: () => void;
}) => {
  const t = useTranslations("SearchFlightsComponent");

  return (
    <div className="absolute z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-5 w-full mt-2 animate-fadeIn">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">{t("Passengers.More")}</h3>
        <button
          onClick={onClose}
          className="p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        {(['adults', 'children', 'infants'] as const).map((type) => (
          <div key={type} className="flex justify-between items-center">
            <div>
              <div className="font-medium text-gray-800">
                {t(`Passengers.${type.charAt(0).toUpperCase() + type.slice(1)}.Text`)}
              </div>
              <div className="text-sm text-gray-500">
                {t(`Passengers.${type.charAt(0).toUpperCase() + type.slice(1)}.EX`)}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
                disabled={
                  (type === 'adults' && passengers[type] <= 1) ||
                  (type !== 'adults' && passengers[type] <= 0)
                }
                onClick={() => onChange(type, -1)}
              >
                <Minus size={16} className="text-blue-500" />
              </button>
              <span className="font-medium w-6 text-center">{passengers[type]}</span>
              <button
                className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
                disabled={type === 'infants' && passengers[type] >= passengers.adults}
                onClick={() => onChange(type, 1)}
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