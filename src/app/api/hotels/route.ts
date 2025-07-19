// src/app/api/hotels/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  
  if (!destination || !checkIn || !checkOut) {
    return NextResponse.json(
      { error: 'Missing required parameters (destination, checkIn, checkOut)' },
      { status: 400 }
    );
  }

  try {
    const response = await fetchHotelbedsData({
      destination,
      checkIn,
      checkOut
    });
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Full API Error:', error);

    const apiError = error.apiError?.error || {};
    return NextResponse.json(
      { 
        error: apiError.message || 'Failed to fetch hotel data',
        code: apiError.code,
        details: {
          status: error.status,
          invalidDates: error.message?.includes('date') ? true : undefined,
          requestDates: {
            checkIn,
            checkOut
          }
        }
      },
      { status: error.status || 500 }
    );
  }
}

async function fetchHotelbedsData(params: {
  destination: string;
  checkIn: string;
  checkOut: string;
}) {
  const API_KEY = process.env.HOTELBEDS_API_KEY?.trim();
  const API_SECRET = process.env.HOTELBEDS_API_SECRET?.trim();
  
  if (!API_KEY || !API_SECRET) {
    throw new Error('Hotelbeds API credentials not configured');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  
  const checkInDate = new Date(params.checkIn);
  const checkOutDate = new Date(params.checkOut);

  if (checkInDate < today) {
    throw {
      message: 'Check-in date must be in the future',
      status: 400
    };
  }

  if (checkOutDate <= checkInDate) {
    throw {
      message: 'Check-out date must be after check-in date',
      status: 400
    };
  }

  const API_ENDPOINT = 'https://api.test.hotelbeds.com/hotel-api/1.0/hotels';
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = crypto
    .createHash('sha256')
    .update(API_KEY + API_SECRET + timestamp)
    .digest('hex');

  const headers = {
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip',
    'Content-Type': 'application/json',
    'Api-Key': API_KEY,
    'X-Signature': signature,
  };

  const body = {
    stay: {
      checkIn: params.checkIn,
      checkOut: params.checkOut
    },
    occupancies: [{
      rooms: 1,
      adults: 2,
      children: 0
    }],
    destinations: [{
      code: params.destination
    }]
  };

  console.log('Making request to Hotelbeds API:', {
    endpoint: API_ENDPOINT,
    timestamp,
    body
  });

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { error: { message: response.statusText } };
    }
    
    throw {
      message: 'Hotelbeds API request failed',
      status: response.status,
      apiError: errorData
    };
  }

  return await response.json();
}