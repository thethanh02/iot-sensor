import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    return NextResponse.json({ msg: "Comment added successfully" })
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}