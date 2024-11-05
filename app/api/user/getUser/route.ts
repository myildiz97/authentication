import connectToDb from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await connectToDb();
    const user = await User.findOne({
      email,
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error checking user' }, { status: 500 });
  }
}
