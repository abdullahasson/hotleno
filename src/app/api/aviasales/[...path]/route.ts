import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const basePath = '/api/aviasales/';
    const apiPath = pathname.startsWith(basePath) 
      ? pathname.slice(basePath.length)
      : '';
    
    const baseUrl = process.env.NEXT_PUBLIC_AVIASALES_BASE_URL || 'https://api.travelpayouts.com';
    const apiToken = process.env.TRAVELPAYOUTS_API_TOKEN || '65b7444863a8c0f818ad4d2369312298';
    
    if (!baseUrl || !apiToken) {
      return NextResponse.json(
        { error: "Server configuration error - check environment variables" },
        { status: 500 }
      );
    }

    // Build target URL
    const targetUrl = new URL(`${baseUrl}/${apiPath}`);
    
    // Transfer query parameters
    url.searchParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });
    
    // Add authentication
    targetUrl.searchParams.append('token', apiToken);

    console.log(`Proxying to: ${targetUrl.toString()}`);
    
    const apiResponse = await fetch(targetUrl.toString(), {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 0 }
    });
    
    return processApiResponse(apiResponse);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

async function processApiResponse(response: Response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  // Handle TravelPayouts-specific errors
  if (data.error) {
    return NextResponse.json(
      { error: data.error, details: data },
      { status: 400 }
    );
  }

  return NextResponse.json(data);
}

function handleApiError(error: unknown) {
  let status = 500;
  let message = 'Internal server error';
  
  if (error instanceof Error) {
    console.error('API proxy error:', error.message);
    
    // Handle specific error cases
    if (error.message.includes('location')) {
      message = 'Invalid location. Please try a different city.';
      status = 400;
    } else if (error.message.includes('date') || error.message.includes('check')) {
      message = 'Invalid date range. Check-out must be after check-in.';
      status = 400;
    } else if (error.message.includes('token')) {
      message = 'Authentication error. Please contact support.';
      status = 401;
    } else {
      message = error.message;
    }
  }
  
  return NextResponse.json(
    { error: message },
    { status }
  );
}