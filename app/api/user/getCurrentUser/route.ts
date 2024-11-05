import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({ user: session.user }, { status: 200 });
}
