export interface Location {
  latitude: number;
  longitude: number;
}

export interface Pax {
  adults: number;
  children: number;
}

export interface CancellationPolicy {
  isRefundable: boolean;
  deadline: string;
}

export interface Room {
  roomName: string;
  board: string;
  price: number;
  pax: Pax;
  cancellationPolicy: CancellationPolicy;
  rateKey: string;
  isBookable: boolean;
}

export interface HotelResult {
  provider: string;
  hotelId: string;
  name: string;
  rating: number;
  location: Location;
  address: string;
  zoneName: string;
  minPrice: number;
  maxPrice: number;
  currency: string;
  rooms: Room[];
}

export interface HotelsSearchResponse {
  searchId: string;
  results: HotelResult[];
}

// Filter types
export interface PriceFilter {
  min: number;
  max: number;
}

export interface Filters {
  priceRange: PriceFilter;
  starRatings: number[];
  freeCancellation: boolean;
}