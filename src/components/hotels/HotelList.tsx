"use client";

// Next 
import Image from 'next/image';
import dynamic from 'next/dynamic';
// React
import { useState, useEffect, useMemo } from 'react';
// Next Intl
import { useTranslations } from 'next-intl';
// Icons
import {
  Star,
  MapPin,
  Heart,
  Bed,
  Utensils,
} from 'lucide-react';
// Components
const MapComponent = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 rounded-xl flex items-center justify-center">Loading map...</div>
});
// Images
import Logo from "../../../public/logo.jpg"
import placeholderHotelImage from "../../../public/hotel-image-placeholder.jpg";

export type Hotel = {
  provider: string;
  hotelId: string;
  name: string;
  rating: number;
  location: {
    latitude: number;
    longitude: number;
  };
  address: string;
  zoneName: string;
  minPrice: number;
  maxPrice: number;
  currency: string;
  rooms: {
    roomName: string;
    board: string;
    price: number;
    pax: {
      adults: number;
      children: number;
    };
    cancellationPolicy: {
      isRefundable: boolean;
      deadline: string;
    };
    rateKey: string;
    isBookable: boolean;
  }[];
};

type HotelListProps = {
  hotels: Hotel[];
};

type FilterState = {
  minPrice: number;
  maxPrice: number;
  minStars: number;
  maxStars: number;
  locationType: 'all' | 'center';
  highRatedOnly: boolean;
  freeCancellation: boolean;
  boardTypes: string[];
};

export default function HotelList({
  hotels,
}: HotelListProps) {
  const t = useTranslations('HotelList');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 5000,
    minStars: 1,
    maxStars: 5,
    locationType: 'all',
    highRatedOnly: false,
    freeCancellation: false,
    boardTypes: []
  });


  // Initialize price range from data
  useEffect(() => {
    if (hotels.length > 0) {
      const prices = hotels.flatMap(hotel => hotel.rooms.map(room => room.price));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setFilters(prev => ({
        ...prev,
        minPrice,
        maxPrice
      }));
    }
  }, [hotels]);



  // Toggle favorite
  const toggleFavorite = (hotelId: string) => {
    setFavorites(prev =>
      prev.includes(hotelId)
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  // Filter hotels based on filter criteria
  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      // Price filter (using min room price)
      const minRoomPrice = Math.min(...hotel.rooms.map(room => room.price));
      if (minRoomPrice < filters.minPrice || minRoomPrice > filters.maxPrice) {
        return false;
      }

      // Star rating filter
      if (hotel.rating < filters.minStars || hotel.rating > filters.maxStars) {
        return false;
      }

      // High-rated filter (4+ stars)
      if (filters.highRatedOnly && hotel.rating < 4) {
        return false;
      }

      // Location type filter
      if (filters.locationType === 'center' && !hotel.zoneName.toLowerCase().includes('center')) {
        return false;
      }

      // Free cancellation filter
      if (filters.freeCancellation &&
        !hotel.rooms.some(room => room.cancellationPolicy.isRefundable)) {
        return false;
      }

      // Board type filter
      if (filters.boardTypes.length > 0 &&
        !hotel.rooms.some(room => filters.boardTypes.includes(room.board))) {
        return false;
      }

      return true;
    });
  }, [hotels, filters]);

  // Reset all filters
  const resetFilters = () => {
    const prices = hotels.flatMap(hotel => hotel.rooms.map(room => room.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setFilters({
      minPrice,
      maxPrice,
      minStars: 1,
      maxStars: 5,
      locationType: 'all',
      highRatedOnly: false,
      freeCancellation: false,
      boardTypes: []
    });
  };



  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t('noresults')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Hotel List */}
      <div className={`flex-1`}>
        <div className='bg-white p-2 mb-4 rounded-2xl'>
          {/* Add Filters Here */}
        </div>

        <div className='bg-white border border-blue-500 rounded-2xl p-4 flex items-center justify-between mb-4'>
          <div className="flex items-center gap-4">
            <Image src={placeholderHotelImage} alt="sign up" className='rounded-full w-12 h-12' />
            <div>
              <h3 className="font-bold font-3xl">
                Save up to 50% on login
              </h3>
              <p>
                Enjoy exclusive prices in Hail for Hotleno members
              </p>
            </div>
          </div>

          <button className="w-auto cursor-pointer rounded-full max-[767px]:rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Sign Up free
          </button>
        </div>

        <div className={`
              bg-white 
              border-gray-400 border 
             rounded-2xl 
              shadow-sm 
              overflow-hidden
            `}>
          <ul>
            {filteredHotels.map((hotel) => {
              const cheapestRoom = hotel.rooms.reduce((prev, current) =>
                (prev.price < current.price) ? prev : current
              );
              const isFavorite = favorites.includes(`${hotel.provider}-${hotel.hotelId}`);

              return (
                <li
                  key={`${hotel.provider}-${hotel.hotelId}`}
                  className={`border-b border-gray-400 last:border-0 hover:bg-gray-50 transition ${selectedHotel?.hotelId === hotel.hotelId && selectedHotel?.provider === hotel.provider ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedHotel(hotel)}
                >
                  <div className="block p-4">
                    <div className="flex items-center flex-col md:flex-row gap-4">
                      {/* Hotel Image */}
                      <div className="relative flex-shrink-0 w-full md:w-48 h-48 rounded-xl overflow-hidden bg-green-300">
                        <Image
                          src={placeholderHotelImage}
                          alt={hotel.name}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(`${hotel.provider}-${hotel.hotelId}`);
                          }}
                          className={`absolute cursor-pointer top-2 right-2 p-2 rounded-full ${isFavorite ? 'text-red-500 bg-white' : 'text-gray-400 bg-white/80 hover:text-red-500'}`}
                        >
                          <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {hotel.rooms.length} room types
                        </div>
                      </div>

                      {/* Hotel Info */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{hotel.name}</h3>
                            <div className="flex items-center text-gray-600 text-sm mb-2">
                              <MapPin size={14} className="mr-1" />
                              <span>{hotel.address}</span>
                            </div>

                            <div className="flex items-center mb-3">
                              <div className="flex mr-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={`mr-0.5 ${i < Math.floor(hotel.rating)
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-300'
                                      }`}
                                  />
                                ))}
                              </div>
                              <span className="text-gray-700 text-sm font-medium mr-2">
                                {hotel.rating.toFixed(1)}
                              </span>
                              <span className="text-gray-500 text-sm">{hotel.zoneName}</span>
                            </div>

                            {/* Room Info */}
                            <div className="mt-2">
                              <div className="text-sm font-medium text-gray-800 mb-1">
                                {cheapestRoom.roomName}
                              </div>
                              <div className="flex flex-wrap gap-1.5 text-xs mb-2">
                                <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center">
                                  <Bed size={12} className="mr-1" />
                                  {cheapestRoom.pax.adults} {t('adults')}
                                  {cheapestRoom.pax.children > 0 && ` + ${cheapestRoom.pax.children} ${t('children')}`}
                                </div>
                                <div className="bg-green-50 text-green-700 px-2 py-1 rounded flex items-center">
                                  <Utensils size={12} className="mr-1" />
                                  {cheapestRoom.board}
                                </div>
                                <div className={`px-2 py-1 rounded flex items-center ${cheapestRoom.cancellationPolicy.isRefundable ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                  {cheapestRoom.cancellationPolicy.isRefundable ? t('refundable') : t('nonRefundable')}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Price Info */}
                          <div className="text-right flex flex-col justify-between gap-2 items-center">
                            <Image src={Logo} alt="Provider Logo" className="w-14" />
                            <div>
                              <div className="text-xl font-bold text-blue-600">
                                {hotel.currency || 'USD'}{cheapestRoom.price}
                              </div>
                              <div className="text-gray-500 text-xs mt-1">
                                {t('fromPrice')}
                              </div>
                            </div>
                            <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition">
                              {t('bookNow')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Empty State */}
          {filteredHotels.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-gray-500 text-lg">{t('noFilterResults')}</div>
              <button
                onClick={resetFilters}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
              >
                {t('resetFilters')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 h-[600px] max-h-screen p-4 lg:h-auto sticky top-0">
        <div className={`bg-white border-gray-400 border rounded-2xl shadow-sm overflow-hidden h-full`}>
          <MapComponent
            hotels={filteredHotels}
            selectedHotel={selectedHotel}
            onHotelSelect={setSelectedHotel}
          />
        </div>
      </div>
    </div>
  );
}