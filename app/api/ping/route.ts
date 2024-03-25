import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: 'pong' });
  } catch (error) {
    console.error("[Gem_Category_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
