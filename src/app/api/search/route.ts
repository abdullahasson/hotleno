// src/app/api/search/route.ts
import { NextRequest } from 'next/server';
import { SearchParams } from '@/types/hotel';

// Define interface for API hotel response
interface ApiHotel {
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

// Define extended interface with bookingUrl
interface HotelResult extends ApiHotel {
  bookingUrl: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const params: SearchParams = {
    location: searchParams.get('location') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    adults: Number(searchParams.get('adults')) || 1,
  };

  const apiParams = new URLSearchParams({
    location: params.location,
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    adults: params.adults.toString(),
    token: process.env.TRAVELPAYOUTS_API_TOKEN!,
    partner: process.env.TRAVELPAYOUTS_PARTNER_ID!,
    limit: '50', // Request more hotels
    currency: 'usd',
    language: 'en',
  });

  try {
    const response = await fetch(`${process.env.HOTEL_API_URL}?${apiParams}`);
    const data: ApiHotel[] = await response.json();

    const results: HotelResult[] = data.map(hotel => {
      // Generate booking URL with affiliate parameters
      const bookingUrl = new URL('https://search.hotellook.com/');
      bookingUrl.searchParams.set('marker', process.env.TRAVELPAYOUTS_PARTNER_ID!);
      bookingUrl.searchParams.set('hotelId', hotel.hotelId.toString());
      bookingUrl.searchParams.set('checkIn', params.checkIn);
      bookingUrl.searchParams.set('checkOut', params.checkOut);
      bookingUrl.searchParams.set('adults', params.adults.toString());
      
      return {
        ...hotel,
        bookingUrl: bookingUrl.toString()
      };
    });

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('API fetch error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}