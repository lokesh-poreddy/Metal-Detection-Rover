import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const command = await request.json();
    
    // Forward the command to your Unity WebGL instance or Firebase
    const unityEndpoint = process.env.UNITY_API_ENDPOINT || 'http://localhost:8080/update';
    
    const response = await fetch(unityEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.UNITY_API_KEY || 'your-api-key',
      },
      body: JSON.stringify({
        field1: command.direction,
        field2: command.rotation || 0,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to forward command to Unity');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process command' },
      { status: 500 }
    );
  }
}