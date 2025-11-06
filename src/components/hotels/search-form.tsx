import { useState } from 'react';
import { CalendarIcon, MapPin, User, Search, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PassengerSelector } from './passenger-selector';
import { SearchParamsState } from '@/types/hotel';

type SearchFormProps = {
    params: SearchParamsState;
    onParamChange: <K extends keyof SearchParamsState>(key: K, value: SearchParamsState[K]) => void;
    onSearch: () => void;
    loading: boolean;
};

export const SearchForm = ({ params, onParamChange, onSearch, loading }: SearchFormProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    // const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const totalGuests = params.passengers.adults + params.passengers.children;

    return (
        <div>
            <div className="selcon-btn" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <ArrowUp /> : <ArrowDown />}
            </div>

            <div className={`
        bg-white 
        w-full 
        shadow-xl 
        p-4 sm:p-6 
        border-y border-gray-400
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
                                value={params.location}
                                onChange={(e) => onParamChange('location', e.target.value)}
                                placeholder="City or Hotel"
                                className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-xl hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Date Pickers */}
                    <div className="w-full sm:flex-[2] flex flex-col sm:flex-row gap-3">
                        {/* Check-in Date Picker */}
                        <div className="flex-1 relative">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className={`
                    w-full pl-10 pr-4 py-3
                    border border-gray-400 rounded-xl
                    hover:border-blue-400 focus-within:border-blue-500
                    transition-colors cursor-pointer
                    flex items-center
                    ${params.checkIn ? "text-gray-800" : "text-gray-400"}
                  `}>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CalendarIcon size={20} className="text-blue-500" />
                                        </div>
                                        {params.checkIn ?
                                            format(params.checkIn, "MMM dd, yyyy") :
                                            "Check-in"
                                        }
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={params.checkIn}
                                        onSelect={(date) => onParamChange('checkIn', date || new Date())}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Check-out Date Picker */}
                        {/* Check-out Date Picker (corrected) */}
                        <div className="flex-1 relative">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className={`
              w-full pl-10 pr-4 py-3
              border border-gray-400 rounded-xl
              hover:border-blue-400 focus-within:border-blue-500
              transition-colors cursor-pointer
              flex items-center
              ${params.checkOut ? "text-gray-800" : "text-gray-400"}
            `}>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CalendarIcon size={20} className="text-blue-500" />
                                        </div>
                                        {params.checkOut ?
                                            format(params.checkOut, "MMM dd, yyyy") :
                                            "Check-out"
                                        }
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={params.checkOut}
                                        onSelect={(date) => onParamChange('checkOut', date || tomorrow)}
                                        disabled={(date) => date < (params.checkIn || tomorrow)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Guests */}
                    <div className="w-full sm:flex-1 relative">
                        <div
                            className="border border-gray-400 rounded-xl py-3 pr-4 pl-10 cursor-pointer hover:border-blue-400 transition-colors duration-300 bg-white"
                            onClick={() => onParamChange('showPassengerSelect', true)}
                        >
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <User size={20} className="text-blue-500" />
                            </div>
                            <div className="font-medium text-gray-800">
                                {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
                            </div>
                        </div>

                        {params.showPassengerSelect && (
                            <PassengerSelector
                                passengers={params.passengers}
                                onChange={(newPassengers) => onParamChange('passengers', newPassengers)}
                                onClose={() => onParamChange('showPassengerSelect', false)}
                            />
                        )}
                    </div>

                    {/* Search Button */}
                    <div className="w-full sm:w-auto">
                        <button
                            onClick={onSearch}
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
            </div>
        </div>
    );
};