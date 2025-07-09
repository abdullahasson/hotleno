// components/HotelList.tsx
import Image from 'next/image';
import { Home, Star, CalendarDays } from 'lucide-react';

// Corrected Hotel type (removed checkIn/checkOut/adults)
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
        <p className="text-gray-500 text-lg">No hotels found. Try different search criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          {hotels.length} {hotels.length === 1 ? 'hotel' : 'hotels'} found in {location}
        </h2>
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <CalendarDays size={16} className="mr-1" />
          {formatDate(checkIn)} - {formatDate(checkOut)}
          <span className="mx-3">•</span>
          {adults} {adults === 1 ? 'adult' : 'adults'}
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
                          Highly Rated
                        </span>
                      )}
                    </div>
                    <div className="text-gray-500">
                      {hotel.hotelName}
                    </div>
                  </div>
                </div>

                <div className="flex-1 max-w-md">
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

                <div className="mt-4 md:mt-0 w-full md:w-auto">
                  <button
                    className="w-full md:w-auto bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-6 rounded-lg transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}