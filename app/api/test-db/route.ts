import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test connection by creating a test record
    const status = await prisma.roverStatus.create({
      data: {
        connected: false,
        battery: 100
      }
    });
    return NextResponse.json({ success: true, status });
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}