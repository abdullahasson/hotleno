export interface HotelSearchResult {
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
  }
  
  export interface SearchParams {
    location: string;
    checkIn: string;
    checkOut: string;
    adults: number;
  }
  