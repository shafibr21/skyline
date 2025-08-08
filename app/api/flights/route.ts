import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const originLocationCode = searchParams.get('originLocationCode') || '';
  const destinationLocationCode = searchParams.get('destinationLocationCode') || '';
  const departureDate = searchParams.get('departureDate') || '';
  const adults = searchParams.get('adults') || '1';
  const authHeader = req.headers.get('authorization') || '';

  const queryParams = new URLSearchParams({
    originLocationCode,
    destinationLocationCode,
    departureDate,
    adults,
    currencyCode: 'USD',
    max: '10',
  }).toString();

  const apiUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?${queryParams}`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: authHeader,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch flights' }, { status: 500 });
  }

  return NextResponse.json(data);
}