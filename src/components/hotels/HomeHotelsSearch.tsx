'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  X,
  Search,
  Minus,
  Plus,
  XCircle,
} from 'lucide-react';
import { format } from 'date-fns';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';

// Custom Components
import LocationAutocomplete from '../ui/location-autocomplete';

export default function HomeHotelsSearch() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("SearchHotelsComponent");

  const [formState, setFormState] = useState({
    location: '',
    checkIn: new Date() as Date | null,
    checkOut: new Date(new Date().setDate(new Date().getDate() + 3)) as Date | null,
    guests: { adults: 2, children: 0 },
    rooms: 1,
    cancellation: false,
    currency: 'USD',
  });

  const [uiState, setUiState] = useState({
    showGuestRoomSelect: false,
    error: ''
  });

  const handleInputChange = <K extends keyof typeof formState>(
    field: K,
    value: typeof formState[K]
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleGuestRoomChange = (type: 'adults' | 'children' | 'rooms', delta: number) => {
    setFormState(prev => {
      if (type === 'rooms') {
        return { ...prev, rooms: Math.max(1, prev.rooms + delta) };
      } else {
        return {
          ...prev,
          guests: { ...prev.guests, [type]: Math.max(0, prev.guests[type] + delta) }
        };
      }
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { location, checkIn, checkOut } = formState;

    if (!location) {
      setUiState(prev => ({ ...prev, error: t("Error.destination") }));
      return;
    }
    if (!checkIn) {
      setUiState(prev => ({ ...prev, error: t("Error.checkIn") }));
      return;
    }
    if (!checkOut) {
      setUiState(prev => ({ ...prev, error: t("Error.checkOut") }));
      return;
    }

    setUiState(prev => ({ ...prev, error: '' }));

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const params = new URLSearchParams({
      location,
      currency: formState.currency.toLowerCase(),
      checkIn: formatDate(checkIn),
      checkOut: formatDate(checkOut),
      adults: formState.guests.adults.toString(),
      children: formState.guests.children.toString(),
      rooms: formState.rooms.toString(),
    });

    router.push(`/${locale}/hotels?${params.toString()}`);
  };

  const totalGuests = formState.guests.adults + formState.guests.children;

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="bg-white w-full rounded-b-3xl shadow-2xl px-8 pb-8 pt-4 max-[767px]:p-6 border border-gray-100">
        <h2 className="text-md font-semibold text-start text-gray-800 mb-4 w-full">
          {t("SearchTitle")}
        </h2>

        <div className="flex items-center gap-5 max-[767px]:gap-2 max-[767px]:flex-col">
          {/* Location */}
          <div className="flex-1 max-[767px]:w-full">
            <div className="relative !text-gray-900">
              <LocationAutocomplete
                value={formState.location}
                onChange={(value) => handleInputChange('location', value)}
                placeholder={t('Location.Placeholder')}
              />
            </div>
          </div>

          {/* Date Pickers */}
          <div className="flex-1 flex gap-3 max-[767px]:w-full max-[767px]:flex-col">
            {/* Check-in Date Picker */}
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-[44px] rounded-xl border border-gray-400 bg-white text-left font-normal hover:bg-white hover:border-blue-400"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formState.checkIn ? (
                      format(formState.checkIn, "MM/dd/yyyy")
                    ) : (
                      <span className="text-gray-400">
                        {t("Date.CheckInPlaceholder")}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formState.checkIn || undefined}
                    onSelect={(date) => handleInputChange('checkIn', date || null)}
                    disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out Date Picker */}
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-[44px] rounded-xl border border-gray-400 bg-white text-left font-normal hover:bg-white hover:border-blue-400"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formState.checkOut ? (
                      format(formState.checkOut, "MM/dd/yyyy")
                    ) : (
                      <span className="text-gray-400">
                        {t("Date.CheckOutPlaceholder")}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formState.checkOut || undefined}
                    onSelect={(date) => handleInputChange('checkOut', date || null)}
                    disabled={(date) => 
                      date < (formState.checkIn || new Date(new Date().setHours(0,0,0,0)))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Guests & Rooms */}
          <div className="flex-1 max-[767px]:w-full">
            <Popover
              open={uiState.showGuestRoomSelect}
              onOpenChange={(open) => setUiState(prev => ({ ...prev, showGuestRoomSelect: open }))}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-[44px] py-3 px-4 justify-start text-left font-normal border-gray-400 hover:border-blue-400"
                >
                  <div className="font-medium text-gray-800">
                    {totalGuests} {totalGuests === 1 
                      ? t("GuestsRooms.Guest") 
                      : t("GuestsRooms.Guests")},
                    {' '}{formState.rooms} {formState.rooms === 1 
                      ? t("GuestsRooms.Room") 
                      : t("GuestsRooms.Rooms")}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <GuestRoomSelector
                  guests={formState.guests}
                  rooms={formState.rooms}
                  onChange={handleGuestRoomChange}
                  onClose={() => setUiState(prev => ({ 
                    ...prev, 
                    showGuestRoomSelect: false 
                  }))}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-4 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-4">
          <div className="flex items-center pl-3 max-[767px]:pl-0">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cancellation"
                checked={formState.cancellation}
                onCheckedChange={(checked) => 
                  handleInputChange('cancellation', checked as boolean)
                }
              />
              <label htmlFor="cancellation" className="text-sm font-medium text-gray-700 cursor-pointer">
                {t("CancellationPolicy")}
              </label>
            </div>
          </div>

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

        {uiState.error && (
          <Alert variant="destructive" className="mt-5 flex items-start border-red-100">
            <XCircle className="h-5 w-5 mt-0.5" />
            <AlertDescription className="ml-2 text-red-700">
              {uiState.error}
            </AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}

// Components
const GuestRoomSelector = ({
  guests,
  rooms,
  onChange,
  onClose
}: {
  guests: { adults: number; children: number };
  rooms: number;
  onChange: (type: 'adults' | 'children' | 'rooms', delta: number) => void;
  onClose: () => void;
}) => {
  const t = useTranslations("SearchHotelsComponent");

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 animate-fadeIn border border-gray-400">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">{t("GuestsRooms.Title")}</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={onClose}
        >
          <X size={18} className="text-gray-500" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Adults */}
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-800">{t("GuestsRooms.Adults")}</div>
            <div className="text-sm text-gray-500">{t("GuestsRooms.AdultsEx")}</div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9"
              disabled={guests.adults <= 1}
              onClick={() => onChange('adults', -1)}
            >
              <Minus size={16} className="text-blue-500" />
            </Button>
            <span className="font-medium w-6 text-center">{guests.adults}</span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9"
              onClick={() => onChange('adults', 1)}
            >
              <Plus size={16} className="text-blue-500" />
            </Button>
          </div>
        </div>

        {/* Children */}
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-800">{t("GuestsRooms.Children")}</div>
            <div className="text-sm text-gray-500">{t("GuestsRooms.ChildrenEx")}</div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9"
              disabled={guests.children <= 0}
              onClick={() => onChange('children', -1)}
            >
              <Minus size={16} className="text-blue-500" />
            </Button>
            <span className="font-medium w-6 text-center">{guests.children}</span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9"
              onClick={() => onChange('children', 1)}
            >
              <Plus size={16} className="text-blue-500" />
            </Button>
          </div>
        </div>

        {/* Rooms */}
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-800">{t("GuestsRooms.Rooms")}</div>
            <div className="text-sm text-gray-500">{t("GuestsRooms.RoomsEx")}</div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9"
              disabled={rooms <= 1}
              onClick={() => onChange('rooms', -1)}
            >
              <Minus size={16} className="text-blue-500" />
            </Button>
            <span className="font-medium w-6 text-center">{rooms}</span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9"
              onClick={() => onChange('rooms', 1)}
            >
              <Plus size={16} className="text-blue-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};