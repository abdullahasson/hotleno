// src/components/HotelList.tsx
"use client";

// Next 
import Image from 'next/image';
import Link from "next/link"
import dynamic from 'next/dynamic';
// React
import { useState, useEffect, useMemo } from 'react';
// Next Intl
import { useTranslations, useLocale } from 'next-intl';
// Icons
import { Star, MapPin, Heart, Bed, Utensils } from 'lucide-react';
// Types
import { Hotel, FilterState, Room, Provider } from '@/types/hotel';
// Components
const MapComponent = dynamic(() => import('./map'), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 rounded-xl flex items-center justify-center">Loading map...</div>
});
// UI
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel"
import { Skeleton } from "../ui/skeleton"
// Images
import placeholderHotelImage from "../../../public/hotel-image-placeholder.jpg";


// import {
//   HomeIcon,
//   ListFilter,
//   // Locate,
//   Search
// } from 'lucide-react';

// import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

// const data = [
//   {
//     title: 'Back Home',
//     icon: (
//       <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
//     )
//   },
//   {
//     title: 'Search',
//     icon: (
//       <Search className='h-full w-full text-neutral-600 dark:text-neutral-300' />
//     )
//   },
//   {
//     title: 'Fillters',
//     icon: (
//       <ListFilter className='h-full w-full text-neutral-600 dark:text-neutral-300' />
//     )
//   }
// ];


type HotelListProps = {
  hotels: Hotel[];
};

export default function HotelList({ hotels }: HotelListProps) {
  const t = useTranslations('HotelList');
  const lang = useLocale();
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [hoveredHotel, setHoveredHotel] = useState<Hotel | null>(null);
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
  // const [uiShow, setUiShow] = useState({
  //   map: true,
  //   search: true,
  //   fillter: true
  // })

  // Initialize price range from data
  useEffect(() => {
    if (hotels.length > 0) {
      const prices = hotels.flatMap(hotel =>
        hotel.providers.flatMap(provider =>
          provider.rooms.map(room => room.price)
        )
      );

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

  // Find cheapest room for a hotel
  const findCheapestRoom = (hotel: Hotel): { room: Room, provider: Provider } => {
    let cheapestRoom: Room | null = null;
    let cheapestProvider: Provider | null = null;
    let minPrice = Infinity;

    for (const provider of hotel.providers) {
      for (const room of provider.rooms) {
        if (room.price < minPrice) {
          minPrice = room.price;
          cheapestRoom = room;
          cheapestProvider = provider;
        }
      }
    }

    // Handle case where no rooms are found (shouldn't happen in real data)
    if (!cheapestRoom || !cheapestProvider) {
      // Fallback to first available room
      return {
        room: hotel.providers[0].rooms[0],
        provider: hotel.providers[0]
      };
    }

    return {
      room: cheapestRoom,
      provider: cheapestProvider
    };
  };

  // Filter hotels based on filter criteria
  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      // Get cheapest room for price comparison
      const { room: cheapestRoom } = findCheapestRoom(hotel);

      // Price filter
      if (cheapestRoom.price < filters.minPrice || cheapestRoom.price > filters.maxPrice) {
        return false;
      }

      // Star rating filter
      if (hotel.stars < filters.minStars || hotel.stars > filters.maxStars) {
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
      if (filters.freeCancellation) {
        const hasRefundable = hotel.providers.some(provider =>
          provider.rooms.some(room => room.cancellationPolicy.isRefundable)
        );
        if (!hasRefundable) return false;
      }

      // Board type filter
      if (filters.boardTypes.length > 0) {
        const hasBoardType = hotel.providers.some(provider =>
          provider.rooms.some(room => filters.boardTypes.includes(room.board))
        );
        if (!hasBoardType) return false;
      }

      return true;
    });
  }, [hotels, filters]);

  // Reset all filters
  const resetFilters = () => {
    const prices = hotels.flatMap(hotel =>
      hotel.providers.flatMap(provider =>
        provider.rooms.map(room => room.price)
      )
    );

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
        {/* ... (filters and signup banner remain the same) ... */}

        <div className={`
          bg-white 
          border-gray-400 border 
          rounded-2xl 
          shadow-sm 
          overflow-hidden
        `}>
          <ul>
            {filteredHotels.map((hotel) => {
              const { room: cheapestRoom, provider: cheapestProvider } = findCheapestRoom(hotel);
              const isFavorite = favorites.includes(hotel.id);
              const listOfImages = hotel.images

              return (
                <li
                  key={hotel.id}
                  className={`border-b border-gray-400 last:border-0 hover:bg-gray-50 transition ${selectedHotel?.id === hotel.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedHotel(hotel)}
                  onMouseEnter={() => setHoveredHotel(hotel)}
                  onMouseLeave={() => setHoveredHotel(null)}
                >
                  <div className="block p-4">
                    <div className="flex items-center flex-col md:flex-row gap-4">
                      {/* Hotel Image */}
                      <div className="relative flex-shrink-0 w-full md:w-48 h-48 rounded-xl overflow-hidden">
                        <div className='w-full h-full bg-gray-400'>
                          <Skeleton className='w-full h-full absolute top-0 left-0 z-10' />
                          <div className='relative z-20 w-full h-full'>

                            {listOfImages.length > 0 ? (
                              <>
                                <Carousel className='w-48 h-48 bg-green-400'>
                                  <CarouselContent>
                                    {
                                      hotel.images.map((image, index) => (
                                        <CarouselItem key={`${index + 1}`}>
                                          <div className='w-full h-48 bg-red-300 flex items-center justify-center text-2xl'>
                                            <Image
                                              src={image}
                                              alt={`${index + 1}-${hotel.name}`}
                                              fill
                                              className="object-cover object-center"
                                            />

                                            <p>{index + 1}</p>
                                          </div>
                                        </CarouselItem>
                                      ))
                                    }
                                  </CarouselContent>
                                </Carousel>
                              </>
                            ) : (
                              <>
                                <Image
                                  src={placeholderHotelImage}
                                  alt={hotel.name}
                                  fill
                                  className="object-cover"
                                  placeholder="blur"
                                />
                              </>
                            )}
                          </div>
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(hotel.id);
                          }}
                          className={`absolute z-50 cursor-pointer top-2 right-2 p-2 rounded-full ${isFavorite ? 'text-red-500 bg-white' : 'text-gray-400 bg-white/80 hover:text-red-500'}`}
                        >
                          <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                        </button>

                        {/* Room Count Badge */}
                        <div className="absolute z-50 top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-xl">
                          {hotel.providers.reduce((total, provider) => total + provider.rooms.length, 0)} room types
                        </div>
                      </div>
                      {/* Hotel Info */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center">
                          <div className="flex-[3.4]">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{hotel.name}</h3>
                            <div className="flex items-center text-gray-600 text-sm mb-2">
                              <MapPin size={14} className="mr-1" />
                              <span>{hotel.address}</span>
                            </div>

                            <div className="flex items-center mb-3">
                              {/* Star Rating */}
                              <div className="flex mr-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={`mr-0.5 ${i < hotel.stars
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

                            {/* Amenities */}
                            <div className="flex flex-wrap gap-1.5 text-xs mb-2">
                              {hotel.amenities.slice(0, 3).map((amenity, index) => (
                                <div
                                  key={index}
                                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded"
                                >
                                  {amenity}
                                </div>
                              ))}
                              {hotel.amenities.length > 3 && (
                                <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                  +{hotel.amenities.length - 3} more
                                </div>
                              )}
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
                                {cheapestRoom.perks && cheapestRoom.perks.length > 0 && (
                                  <div className="bg-purple-50 text-purple-700 px-2 py-1 rounded">
                                    {cheapestRoom.perks[0]}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Price Info */}
                          <div className="text-right flex flex-col justify-between flex-1 gap-2 items-center">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">via</span>
                              <span className="font-medium text-xs">
                                {cheapestProvider.provider === 'hotleno-direct'
                                  ? 'Hotleno'
                                  : cheapestProvider.provider}
                              </span>
                            </div>
                            <div>
                              <div className="text-xl font-bold text-blue-600">
                                {cheapestProvider.currency || 'EUR'}{cheapestRoom.price}
                              </div>
                              <div className="text-gray-500 text-xs mt-1">
                                {t('fromPrice')}
                              </div>
                            </div>
                            <Link href={`/${lang}/hotels/${hotel.id}`} className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition">
                              {t('bookNow')}
                            </Link>
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

 
          <div className="flex-1 h-[600px] max-h-screen p-4 lg:h-auto sticky top-0">
            <div className={`bg-white border-gray-400 border rounded-2xl shadow-sm overflow-hidden h-full`}>
              <MapComponent
                hotels={filteredHotels}
                selectedHotel={selectedHotel}
                hoveredHotel={hoveredHotel}
                onHotelSelect={setSelectedHotel}
              />
            </div>
          </div>




      {/* <div className='fixed bottom-3 left-1/2 max-w-full -translate-x-1/2'>
        <Dock className='items-end pb-3 bg-gray-300'>
          {data.map((item, idx) => (
            <button key={idx} className='cursor-pointer'>
              <DockItem

                className='aspect-square rounded-full bg-gray-200'
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>{item.icon}</DockIcon>
              </DockItem>
            </button>
          ))}
          <button className='cursor-pointer' onClick={() => setUiShow({
            ...uiShow,
            map: !uiShow.map
          })}>
            <DockItem
              className='aspect-square rounded-full bg-gray-200'
            >
              <DockLabel>
                Map
              </DockLabel>
              <DockIcon>
                <Locate className='h-full w-full text-neutral-600 dark:text-neutral-300' />
              </DockIcon>
            </DockItem>
          </button>
        </Dock>
      </div> */}
    </div>
  );
}