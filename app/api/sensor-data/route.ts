import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sensorData = await prisma.sensorData.create({
      data: body,
    });
    return NextResponse.json(sensorData);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating sensor data' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sensorData = await prisma.sensorData.findMany({
      orderBy: {
        timestamp: 'desc',
      },
      take: 10,
    });
    return NextResponse.json(sensorData);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching sensor data' }, { status: 500 });
  }
}