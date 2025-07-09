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
  });

  try {
    const response = await fetch(`${process.env.HOTEL_API_URL}?${apiParams}`);
    const data: ApiHotel[] = await response.json(); // Replaced any[] with ApiHotel[]

    const results = data.map(hotel => ({
      hotelId: hotel.hotelId,
      hotelName: hotel.hotelName,
      location: {
        name: hotel.location.name,
        country: hotel.location.country
      },
      priceAvg: hotel.priceAvg,
      pricePercentile: hotel.pricePercentile,
      stars: hotel.stars,
      locationId: hotel.locationId,
      imageUrl: hotel.imageUrl
    }));

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('API fetch error:', error); // Now using the error variable
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}