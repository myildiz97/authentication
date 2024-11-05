import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDb from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDb();
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: 'User registered' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}
