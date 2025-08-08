import { NextResponse } from 'next/server';

export async function POST() {
  const clientId = process.env.AMADEUS_API_KEY;
  const clientSecret = process.env.AMADEUS_API_SECRET;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to get token' }, { status: 500 });
  }

  return NextResponse.json(data);
}
