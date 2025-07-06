export interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  }
  
  export interface FlightSearchParams {
    origin: string;
    destination: string;
    depart_date: string;
    return_date?: string;
    currency?: string;
  }
  
  export interface FlightResult {
    id: string;
    price: number;
    airline: string;
    airline_logo?: string;
    flight_number: string;
    departure_time: string;
    arrival_time: string;
    origin: string;
    destination: string;
    duration: number;
    transfers: number;
    currency: string;
    booking_link: string;
  }
  
  export interface PriceCalendarDay {
    date: string;
    price: number;
    is_lowest: boolean;
  }