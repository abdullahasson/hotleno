// src/types.ts
export type Room = {
  roomName: string;
  board: string;
  price: number;
  pax: {
    adults: number;
    children: number;
  };
  cancellationPolicy: {
    isRefundable: boolean;
    deadline: string;
  };
  rateKey: string;
  isBookable: boolean;
  perks?: string[];
};

export type Provider = {
  provider: string;
  hotelId: string;
  minPrice: number;
  maxPrice: number;
  currency: string;
  rooms: Room[];
};

export type review = {
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
}

export type Hotel = {
  id: string;
  name: string;
  rating: number;
  stars: number;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  address: string;
  zoneName: string;
  amenities: string[];
  images: string[];
  facilities: string[];
  providers: Provider[];
  guestRating: {
    cleanliness: number;
    comfort: number;
    location: number;
    staff: number;
    valueForMoney: number;
  },
  reviews: review[]
};

export type FilterState = {
  minPrice: number;
  maxPrice: number;
  minStars: number;
  maxStars: number;
  locationType: 'all' | 'center';
  highRatedOnly: boolean;
  freeCancellation: boolean;
  boardTypes: string[];
};

export type PassengerCounts = {
  adults: number;
  children: number;
};

export type SearchParamsState = {
  location: string;
  checkIn: Date;
  checkOut: Date;
  passengers: PassengerCounts;
  showPassengerSelect: boolean;
};

export type SearchResultsProps = {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
};