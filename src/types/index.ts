// src/types/index.ts
export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
  departureAirport: string;
  arrivalAirport: string;
  departureCity: string;
  arrivalCity: string;
}

export interface LocationSuggestion {
  name: string;
  code: string;
  type: string;
  country: string;
  city: string;
}