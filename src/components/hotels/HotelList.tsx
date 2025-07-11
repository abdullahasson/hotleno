// components/HotelList.tsx
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Home, Star, CalendarDays, ArrowUpRight } from 'lucide-react';

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
  bookingUrl: string; // Add bookingUrl to the type
};

type HotelListProps = {
  hotels: Hotel[];
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
};

export default function HotelList({ 
  hotels, 
  location,
  checkIn,
  checkOut,
  adults
}: HotelListProps) {

  const t = useTranslations('HotelList')
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
        {t('found' , {
            count: hotels.length || 0, 
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

      <ul>
        {hotels.map((hotel) => (
          <li
            key={hotel.hotelId}
            className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition"
          >
            <div className="block p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex flex-col sm:flex-row w-full sm:w-1/2 justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-gray-100 p-3 rounded-xl mr-4">
                    {hotel.imageUrl ? (
                      <div className="relative w-12 h-12">
                        <Image
                          src={hotel.imageUrl}
                          alt={hotel.hotelName}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                      <Home size={24} className="text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center relative">
                      <div className="font-bold text-2xl text-gray-900">
                        ${hotel.priceAvg.toFixed(2)}
                      </div>
                      {hotel.stars >= 4 && (
                        <span className="ml-3 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          {t('rated')}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-500">
                      {hotel.hotelName}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-col">
                    <div className="font-medium">
                      {hotel.location.name}, {hotel.location.country}
                    </div>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(hotel.stars)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {hotel.stars.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                </div>

                <div className="mt-4 md:mt-0 w-full md:w-auto">
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
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
          </li>
        ))}
      </ul>
    </div>
  );
}