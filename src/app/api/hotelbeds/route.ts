// app/api/hotelbeds/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getHotelbedsHeaders, handleHotelbedsResponse } from './helpers';
import { HotelbedsResponse } from './types';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.HOTELBEDS_API_KEY;
    const apiSecret = process.env.HOTELBEDS_API_SECRET;
    const baseUrl = process.env.HOTELBEDS_API_URL;

    if (!apiKey || !apiSecret || !baseUrl) {
      return NextResponse.json(
        { error: 'Hotelbeds API credentials not configured' },
        { status: 500 }
      );
    }

    const { endpoint, method, body, query }: any = await request.json();
    
    // بناء رابط الطلب مع معاملات البحث
    let url = `${baseUrl}${endpoint}`;
    if (query && Object.keys(query).length > 0) {
      const queryParams = new URLSearchParams(query).toString();
      url += `?${queryParams}`;
    }

    const headers = getHotelbedsHeaders(apiKey, apiSecret);
    
    // زيادة وقت الانتظار إلى 30 ثانية
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result: HotelbedsResponse = await handleHotelbedsResponse(response);
    
    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error.status || 500 }
      );
    }

    return NextResponse.json({ data: result.data });
    
  } catch (error: any) {
    console.error('Hotelbeds API error:', error);
    
    let errorMessage = 'Internal Server Error';
    let statusCode = 500;
    
    if (error.name === 'AbortError') {
      errorMessage = 'Request to Hotelbeds API timed out';
      statusCode = 504;
    }
    
    return NextResponse.json(
      { error: { code: 'CONNECTION_ERROR', message: errorMessage } },
      { status: statusCode }
    );
  }
}