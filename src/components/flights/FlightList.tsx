// Next Intl
import { useTranslations, useLocale } from 'next-intl';
// Types
import { FlightListProps } from "@/types/props"
// Data
import { getAirportInfo } from '@/constants/data'; // Your airport database
import { Plane, CalendarDays } from 'lucide-react'; // Assuming you're using lucide-react

export default function FlightList({
  flights,
  currency,
  destination,
  departureDate,
  tripType,
  returnDate,
  totalPassengers,
  originNow
}: FlightListProps) {

  const t = useTranslations('FlightCard');
  const locale = useLocale(); // From next-intl

  // Format flight times with timezone conversion
  const formatFlightTimes = (departure: string, duration: number) => {
    const departureDate = new Date(departure);
    const arrivalDate = new Date(departureDate.getTime() + duration * 60000);

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };

    return {
      departureTime: departureDate.toLocaleTimeString(locale, timeOptions),
      arrivalTime: arrivalDate.toLocaleTimeString(locale, timeOptions)
    };
  };

  // Format price with currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">
           {locale === "ar" ? 
            `تم العثور على ${flights.length} رحلات جوية` : 
            `Found ${flights.length} flights`
          } • {getAirportInfo(originNow).city[locale]} {locale === "ar" ? 'الى' : 'to'} {getAirportInfo(destination).city[locale]}
        </h2>
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <CalendarDays size={16} className="mr-1" />
          {departureDate?.toLocaleDateString()}
          {tripType === 'round-trip' && returnDate && (
            <>
              <span className="mx-2">-</span>
              {returnDate?.toLocaleDateString()}
            </>
          )}
          <span className="mx-3">•</span>
          {totalPassengers} {totalPassengers === 1 ? 'passenger' : 'passengers'}
        </div>
      </div>

      <ul>
        {flights.map((flight, index) => {
          const originInfo = getAirportInfo(flight.origin);
          const destinationInfo = getAirportInfo(flight.destination);
          const { departureTime, arrivalTime } = formatFlightTimes(
            flight.departure_at,
            flight.duration_to
          );

          return (
            <li
              key={index}
              className="border-b border-gray-300 last:border-0 hover:bg-gray-50 transition"
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
            >
              <a
                href={`https://www.aviasales.com${flight.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-gray-100 p-3 rounded-xl mr-4">
                      <Plane size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center relative">
                        <div className="font-bold text-2xl text-gray-900">
                          {formatPrice(flight.price)}
                        </div>
                        {flight.transfers === 0 && (
                          <span className="absolute top-1 -left-14 ml-3 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                            {t('direct')}
                          </span>
                        )}
                      </div>
                      <div className="text-gray-500">
                        {flight.airline} {flight.flight_number}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 max-w-md">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="font-bold text-lg">
                          {departureTime}
                        </div>
                        <div className="text-gray-500">
                          {originInfo.name[locale] || flight.origin_airport}
                        </div>
                      </div>

                      <div className="mx-2 flex flex-col items-center flex-1 max-w-xs">
                        <div className="text-gray-500 text-sm">
                          {Math.floor(flight.duration_to / 60)}h {flight.duration_to % 60}m
                        </div>
                        <div className="w-full flex items-center my-1">
                          <div className="h-px bg-gray-300 flex-grow"></div>
                          <Plane size={16} className="text-gray-400 mx-1 -rotate-90" />
                          <div className="h-px bg-gray-300 flex-grow"></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.transfers === 0
                            ? t('nonStop')
                            : t('stops', { count: flight.transfers })}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="font-bold text-lg">
                          {arrivalTime}
                        </div>
                        <div className="text-gray-500">
                          {destinationInfo.name[locale] || flight.destination_airport}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 w-full md:w-auto">
                    <button
                      className={`w-full md:w-auto bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-6 rounded-lg transition ${locale === 'ar' ? 'text-right' : 'text-left'
                        }`}
                    >
                      {t('select')}
                    </button>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}