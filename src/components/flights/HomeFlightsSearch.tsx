'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getDestinationByCode } from "@/constants/mock-data"
import { addDays, format } from 'date-fns';
import {
  ArrowRightLeft,
  User,
  X,
  Search,
  Minus,
  Plus,
  XCircle,
  Plane,
  Calendar as CalendarIcon
} from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Custom Components
import AirportSelect from '../ui/airport-select';

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
    showPassengerSelect: false,
    error: ''
  });

  // Handle input changes
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

  // Handle date changes
  const handleDateChange = (field: 'departureDate' | 'returnDate', date: Date | undefined) => {
    setFormState(prev => ({
      ...prev,
      [field]: date || null
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

    if (tripType === 'return' && !returnDate) {
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

    if (tripType === 'return' && returnDate) {
      params.append('return_date', formatDate(returnDate));
    }

    router.push(`/${locale}/flights?${params.toString()}`);
  };

  const totalPassengers = Object.values(formState.passengers).reduce((a, b) => a + b, 0);

  return (
    <div className="flex-1">
      <form
        onSubmit={handleSubmit}
        className={`
          bg-white 
          w-full 
          ${position === 'flights-to' ? 'rounded-3xl relative' : 'rounded-b-2xl'}
          shadow-2xl 
          px-8 pb-8 pt-4 max-[767px]:p-6 
          border border-gray-100
        `}
      >
        {position === 'flights-to' && (
          <div className="text-gray-900 flex items-center absolute z-20 top-0 left-1/2 -translate-x-1/2 -translate-y-3/4 shadow-md bg-white rounded-[100vmax] p-3 text-center">
            <div className="bg-blue-100 p-2 rounded-full">
              <Plane size={24} className="text-blue-600" />
            </div>
            <span className="px-2 font-medium">
              {t('flightsTo', { destination: getDestinationByCode(destinationCode)?.formattedName })}
            </span>
          </div>
        )}

        {/* Trip Type Selector */}
        <div className="flex p-1 pb-0 gap-2 max-[767px]:gap-1 max-[767px]:justify-center">
          {(['one-way', 'return'] as const).map((type) => (
            <Button
              key={type}
              type="button"
              variant={formState.tripType === type ? "default" : "outline"}
              className={`rounded-full text-sm transition-all duration-300 max-[767px]:px-2 ${formState.tripType === type
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-md text-white font-medium'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
              onClick={() => handleInputChange('tripType', type)}
            >
              {t(`TripType.${type === 'one-way' ? 'One' : 'Return'}`)}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-5 max-[767px]:gap-2 max-[767px]:flex-col max-[767px]:w-full mt-4 mb-4 max-[767px]:mb-2">
          {/* Location Inputs */}
          <div className="flex-1 max-[767px]:flex-col max-[767px]:w-full relative flex items-center gap-2">
            <div className="flex-1 relative max-[767px]:w-full max-[767px]:mx-auto">
              <AirportSelect
                value={formState.origin}
                onChange={(value) => handleInputChange('origin', value)}
                placeholder={t('Location.Origin')}
                defaultValue={originCode}
              />
            </div>

            <Button
              type="button"
              onClick={swapLocations}
              variant="outline"
              size="icon"
              className="absolute left-1/2 top-1/2 -translate-1/2 bg-white z-20 max-[767px]:left-0 max-[767px]:m-0 max-[767px]:top-1/2 max-[767px]:-translate-y-1/2 max-[767px]:z-20 p-2 hover:bg-blue-50 rounded-full transition-all duration-300 border border-gray-400"
              aria-label="SwapLocations"
            >
              <ArrowRightLeft size={18} className="text-blue-600" />
            </Button>

            <div className="flex-1 relative max-[767px]:w-full max-[767px]:mx-auto">
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full pl-3 !py-6 !text-gray-900 !rounded-xl text-left font-normal border ${formState.departureDate
                        ? 'border-gray-400'
                        : 'border-gray-400 hover:border-blue-300'
                      }`}
                  >
                    {formState.departureDate ? (
                      format(formState.departureDate, "MMM dd, yyyy")
                    ) : (
                      <span className="text-gray-500">{t("Date.Departure")}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 text-blue-600" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-lg border border-gray-200">
                  <Calendar
                    mode="single"
                    selected={formState.departureDate || undefined}
                    onSelect={(date) => handleDateChange('departureDate', date)}
                    initialFocus
                    disabled={{ before: new Date() }}
                    className="rounded-md"
                    classNames={{
                      day_selected: "bg-blue-600 text-white hover:bg-blue-700",
                      day_today: "border border-gray-400",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {formState.tripType === 'return' && (
              <div className="flex-1 relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                    className={`w-full pl-3 !py-6 !text-gray-900 !rounded-xl text-left font-normal border ${formState.departureDate
                        ? 'border-gray-400'
                        : 'border-gray-400 hover:border-blue-300'
                      }`}
                    >
                      {formState.returnDate ? (
                        format(formState.returnDate, "MMM dd, yyyy")
                      ) : (
                        <span className="text-gray-500">{t("Date.Return")}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 text-blue-600" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-lg border border-gray-200">
                    <Calendar
                      mode="single"
                      selected={formState.returnDate || undefined}
                      onSelect={(date) => handleDateChange('returnDate', date)}
                      initialFocus
                      disabled={{
                        before: formState.departureDate || addDays(new Date(), 1)
                      }}
                      className="rounded-md"
                      classNames={{
                        day_selected: "bg-blue-600 text-white hover:bg-blue-700",
                        day_today: "border border-gray-400",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between max-[767px]:flex-col max-[767px]:w-full max-[767px]:gap-2 max-[767px]:items-start w-full">
          {/* Direct flights */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="direct"
                checked={formState.directOnly}
                onCheckedChange={(checked) =>
                  handleInputChange('directOnly', checked as boolean)
                }
                className="border-blue-500 data-[state=checked]:bg-blue-600"
              />
              <Label htmlFor="direct" className="text-sm font-medium text-gray-700 cursor-pointer">
                {t("Direct")}
              </Label>
            </div>
          </div>

          <div className="flex items-center gap-2 max-[767px]:flex-col max-[767px]:w-full max-[767px]:items-start">
            {/* Currency */}
            <div className="relative max-[767px]:w-full">
              <Select
                value={formState.currency}
                onValueChange={(value) => handleInputChange('currency', value)}
              >
                <SelectTrigger className="w-[120px] !text-gray-900 border border-gray-400 hover:border-blue-300">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="SGD">SGD (S$)</SelectItem>
                  <SelectItem value="THB">THB (฿)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort by */}
            <div className="relative max-[767px]:w-full">
              <Select
                value={formState.sortBy}
                onValueChange={(value) => handleInputChange('sortBy', value as SortBy)}
              >
                <SelectTrigger className="w-[140px] !text-gray-900 border border-gray-400 hover:border-blue-300">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  <SelectItem value="price">{t("SortBy.Price")}</SelectItem>
                  <SelectItem value="duration">{t("SortBy.Duration")}</SelectItem>
                  <SelectItem value="departure">{t("SortBy.Departure")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Passengers */}
            <div className="relative max-[767px]:w-full">
              <Popover open={uiState.showPassengerSelect} onOpenChange={(open) => setUiState(prev => ({ ...prev, showPassengerSelect: open }))}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="pl-12 border border-gray-400 hover:border-blue-300"
                  >
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <User size={20} className="text-blue-600" />
                    </div>
                    <div className="font-medium text-gray-800">
                      {totalPassengers} {totalPassengers === 1 ? t("Passengers.One") : t("Passengers.More")}
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-white border border-blue-300 shadow-md">
                  <PassengerSelector
                    passengers={formState.passengers}
                    onChange={handlePassengerChange}
                    onClose={() => setUiState(prev => ({ ...prev, showPassengerSelect: false }))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <div className="max-[767px]:w-full">
              <Button
              type="submit"
              className="w-full rounded-full max-[767px]:rounded-xl py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <div className="flex items-center gap-2">
                  <Search size={20} />
                  <span className="font-medium">{t("SearchButton")}</span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {uiState.error && (
          <div className="mt-5 p-4 bg-red-50 text-red-700 rounded-xl flex items-center animate-fadeIn border border-red-200">
            <XCircle className="text-red-500" size={20} />
            <span className="mx-2 font-medium">{uiState.error}</span>
          </div>
        )}
      </form>
    </div>
  );
}

// Passenger Selector Component
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
    <div className="bg-white p-5 w-full">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">{t("Passengers.More")}</h3>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="rounded-full text-gray-500 hover:text-blue-600"
        >
          <X size={18} />
        </Button>
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
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border border-gray-400 hover:border-blue-400"
                disabled={
                  (type === 'adults' && passengers[type] <= 1) ||
                  (type !== 'adults' && passengers[type] <= 0)
                }
                onClick={() => onChange(type, -1)}
              >
                <Minus size={16} className="text-blue-600" />
              </Button>
              <span className="font-medium w-6 text-center">{passengers[type]}</span>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border border-gray-400 hover:border-blue-400"
                disabled={type === 'infants' && passengers[type] >= passengers.adults}
                onClick={() => onChange(type, 1)}
              >
                <Plus size={16} className="text-blue-600" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};