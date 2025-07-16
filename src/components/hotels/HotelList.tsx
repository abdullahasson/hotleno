// components/HotelList.tsx
"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Star, CalendarDays, ArrowUpRight, MapPin, Filter, X, Map, Award } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
// Images
import placeholderHotelImage from "../../../public/hotel-image-placeholder.jpg"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export type Hotel = {
  hotelId: number;
  hotelName: string;
  location: {
    name: string;
    country: string;
    state: string | null;
    geo: {
      lat: number;
      lon: number;
    };
  };
  priceFrom: number;
  priceAvg: number;
  pricePercentile: Record<string, number>;
  stars: number;
  locationId: number;
  imageUrl: string;
  bookingUrl: string;
};

type HotelListProps = {
  hotels: Hotel[];
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
};

type FilterState = {
  minPrice: number;
  maxPrice: number;
  minStars: number;
  maxStars: number;
  locationType: 'all' | 'center';
  highRatedOnly: boolean;
};

export default function HotelList({
  hotels,
  location,
  checkIn,
  checkOut,
  adults
}: HotelListProps) {
  const t = useTranslations('HotelList');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 5000,
    minStars: 1,
    maxStars: 5,
    locationType: 'all',
    highRatedOnly: false,
  });

  // Initialize price range from data
  useEffect(() => {
    if (hotels.length > 0) {
      const prices = hotels.map(hotel => hotel.priceAvg);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setFilters(prev => ({
        ...prev,
        minPrice,
        maxPrice
      }));
    }
  }, [hotels]);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Filter hotels based on filter criteria
  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      // Price filter
      if (hotel.priceAvg < filters.minPrice || hotel.priceAvg > filters.maxPrice) {
        return false;
      }

      // Star rating filter
      if (hotel.stars < filters.minStars || hotel.stars > filters.maxStars) {
        return false;
      }

      // High-rated filter (4+ stars)
      if (filters.highRatedOnly && hotel.stars < 4) {
        return false;
      }

      return true;
    });
  }, [hotels, filters]);

  // Reset all filters
  const resetFilters = () => {
    const prices = hotels.map(hotel => hotel.priceAvg);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setFilters({
      minPrice,
      maxPrice,
      minStars: 1,
      maxStars: 5,
      locationType: 'all',
      highRatedOnly: false,
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
    <div className="flex flex-col md:flex-row gap-6">
      {/* Filters Sidebar */}
      <div className={`bg-white sticky top-6 rounded-2xl shadow-xl p-6 h-fit transition-all duration-300 ${showFilters ? 'block' : 'hidden'} md:block md:w-1/4`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold flex items-center">
            <Filter size={18} className="mr-2" />
            {t('filters')}
          </h3>
          <button
            onClick={() => setShowFilters(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">{t('priceRange')} (${filters.minPrice.toFixed(2)} - ${filters.maxPrice.toFixed(2)})</h4>
          <Slider
            range
            min={0}
            max={Math.ceil(filters.maxPrice * 1.2)}
            value={[filters.minPrice, filters.maxPrice]}
            onChange={(value) => {
              if (Array.isArray(value)) {
                setFilters(prev => ({
                  ...prev,
                  minPrice: value[0],
                  maxPrice: value[1]
                }));
              }
            }}
            trackStyle={{ backgroundColor: '#3b82f6', height: 4 }}
            handleStyle={{
              borderColor: '#3b82f6',
              height: 18,
              width: 18,
              opacity: 1
            }}
            railStyle={{ backgroundColor: '#e5e7eb', height: 4 }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>${filters.minPrice.toFixed(2)}</span>
            <span>${filters.maxPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Star Rating Filter */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">{t('starRating')}</h4>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">{filters.minStars} {t('stars')}</span>
            <span className="text-sm text-gray-600">{filters.maxStars} {t('stars')}</span>
          </div>
          <Slider
            range
            min={1}
            max={5}
            value={[filters.minStars, filters.maxStars]}
            onChange={(value) => {
              if (Array.isArray(value)) {
                setFilters(prev => ({
                  ...prev,
                  minStars: value[0],
                  maxStars: value[1]
                }));
              }
            }}
            trackStyle={{ backgroundColor: '#f59e0b', height: 4 }}
            handleStyle={{
              borderColor: '#f59e0b',
              height: 18,
              width: 18,
              opacity: 1
            }}
            railStyle={{ backgroundColor: '#e5e7eb', height: 4 }}
          />
        </div>

        {/* Additional Filters */}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">{t('location')}</h4>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm ${filters.locationType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() => setFilters(prev => ({ ...prev, locationType: 'all' }))}
              >
                {t('allLocations')}
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm ${filters.locationType === 'center'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() => setFilters(prev => ({ ...prev, locationType: 'center' }))}
              >
                {t('cityCenter')}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="high-rated"
              checked={filters.highRatedOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, highRatedOnly: e.target.checked }))}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="high-rated" className="ml-2 text-gray-700">
              {t('highlyRated')} (4+ {t('stars')})
            </label>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="mt-6 w-full py-2 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          {t('resetFilters')}
        </button>
      </div>

      {/* Hotel List */}
      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {t('found', {
                  count: filteredHotels.length || 0,
                  location: location || ''
                })}
              </h2>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <CalendarDays size={16} className="mr-1" />
                {formatDate(checkIn)} - {formatDate(checkOut)}
                <span className="mx-3">•</span>
                {adults} {adults === 1 ? t('adult') : t('adults')}
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
            >
              <Filter size={16} className="mr-2" />
              {showFilters ? t('hideFilters') : t('showFilters')}
            </button>
          </div>

          <ul>
            {filteredHotels.map((hotel) => (
              <li
                key={hotel.hotelId}
                className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition"
              >
                <div className="block p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Hotel Image */}
                    <div className="flex-shrink-0">
                      <div className="bg-gray-100 rounded-xl overflow-hidden w-32 h-32 flex items-center justify-center">
                        {hotel.imageUrl ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={hotel.imageUrl}
                              alt={hotel.hotelName}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/hotel-placeholder.jpg";
                              }}
                            />
                          </div>
                        ) : (
                          <div className="relative w-full h-full">
                            <Image
                              src={placeholderHotelImage}
                              alt={hotel.hotelName}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hotel Info */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.hotelName}</h3>

                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin size={16} className="mr-1" />
                            <span>
                              {hotel.location.name}{hotel.location.state ? `, ${hotel.location.state}` : ''}, {hotel.location.country}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm flex items-center">
                              <Map size={14} className="mr-1" />
                              {hotel.location.geo.lat.toFixed(4)}, {hotel.location.geo.lon.toFixed(4)}
                            </span>
                          </div>

                          <div className="flex items-center mb-4">
                            <div className="flex mr-4">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={18}
                                  className={`mr-1 ${i < Math.floor(hotel.stars)
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-gray-700 font-medium">
                              {hotel.stars.toFixed(1)} {t('stars')}
                            </span>

                            {hotel.stars >= 4 && (
                              <span className="ml-4 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-1 rounded-full flex items-center">
                                <Award size={16} className="mr-1" />
                                {t('rated')}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price Info */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            ${hotel.priceAvg.toFixed(2)}
                          </div>
                          <div className="text-gray-500 text-sm mt-1">
                            {t('fromPrice')}: ${hotel.priceFrom.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-4 flex justify-between">
                        <div className="bg-blue-50 rounded-lg px-4 py-2">
                          <div className="text-sm text-gray-600 font-medium mb-1">
                            dd
                          </div>
                          <div className="flex gap-2">
                            {Object.entries(hotel.pricePercentile).map(([percentile, price]) => (
                              <div key={percentile} className="text-xs text-gray-600">
                                <div className="font-medium">${price.toFixed(2)}</div>
                                <div className="text-gray-400">{percentile}%</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <a
                          href={hotel.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition self-center h-fit"
                        >
                          {t('details')}
                          <ArrowUpRight
                            size={18}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
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
    </div>
  );
}