// src/components/hotels/HotelList.tsx
import Image from 'next/image';
import { Star, MapPin, Users, Bed, Wifi, Coffee, Dumbbell } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface HotelData {
  id: number;
  name: string;
  stars: number;
  price: number;
  location: {
    name: string;
    country: string;
  };
  checkIn: string;
  checkOut: string;
  imageUrl: string;
  rating: number;
  amenities: string[];
  link: string;
}

interface GuestConfig {
  adults: number;
  children: number;
  rooms: number;
}

interface HotelListProps {
  hotels: HotelData[];
  currency: string;
  checkIn: Date;
  checkOut: Date;
  guests: GuestConfig;
}

export default function HotelList({ 
  hotels, 
  currency, 
  checkIn, 
  checkOut,
  guests 
}: HotelListProps) {
  const t = useTranslations("HotelList");
  
  // Calculate number of nights
  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Get rating text
  const getRatingText = (rating: number) => {
    if (rating >= 9) return t('Rating.Excellent');
    if (rating >= 8) return t('Rating.VeryGood');
    if (rating >= 7) return t('Rating.Good');
    if (rating >= 6) return t('Rating.Fair');
    return t('Rating.Poor');
  };

  return (
    <div className="space-y-6">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative aspect-video">
              <Image 
                src={hotel.imageUrl || '/hotel-placeholder.jpg'} 
                alt={hotel.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="md:w-2/3 p-5">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < hotel.stars ? "#F59E0B" : "none"} 
                          className={i < hotel.stars ? "text-amber-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {hotel.stars} {t('Stars')}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={16} className="mr-1" />
                    <span>{hotel.location.name}, {hotel.location.country}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities?.slice(0, 4).map((amenity, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs flex items-center">
                        {amenity === 'WiFi' && <Wifi size={14} className="mr-1" />}
                        {amenity === 'Breakfast' && <Coffee size={14} className="mr-1" />}
                        {amenity === 'Gym' && <Dumbbell size={14} className="mr-1" />}
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-left md:text-right min-w-[150px]">
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {currency} {hotel.price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {' '}/ {nights} {nights === 1 ? t('PerNight') : t('PerNights')}
                    </span>
                  </div>
                  
                  <div className="text-gray-500 text-sm mb-3">
                    <span>{t('Includes')}</span>
                  </div>
                  
                  <a 
                    href={hotel.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    {t('ViewDeal')}
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-100 pt-3 mt-3">
                <div className="flex flex-wrap gap-4 mb-2 md:mb-0">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={16} className="mr-1" />
                    <span>{guests.adults + guests.children} {t('Guests')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Bed size={16} className="mr-1" />
                    <span>{guests.rooms} {guests.rooms === 1 ? t('Room') : t('Rooms')}</span>
                  </div>
                </div>
                
                <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full">
                  <span className="font-medium">{hotel.rating.toFixed(1)}</span>
                  <span className="ml-1">/ 10</span>
                  <span className="ml-2">{getRatingText(hotel.rating)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}