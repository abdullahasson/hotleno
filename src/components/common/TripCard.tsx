import React from 'react';
import { Trip } from '@/lib/data';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface TripCardProps {
  trip: Trip;
  roundTripText: string;
}

const TripCard: React.FC<TripCardProps> = ({ trip, roundTripText }) => {

  const t = useTranslations('TripIdeas');

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row h-full">
        <div className="relative sm:w-2/5 h-48 sm:h-auto">
          <Image 
            src={trip.image} 
            alt={`${trip.city}, ${trip.country}`} 
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
          />
        </div>
        
        <div className="p-4 sm:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-gray-900">{t(`cities.${trip.city}`)}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {roundTripText}
              </span>
            </div>
            <p className="text-gray-500 text-sm">{t(`countries.${trip.country}`)}</p>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">${trip.price}</span>
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              {t('card.details')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;