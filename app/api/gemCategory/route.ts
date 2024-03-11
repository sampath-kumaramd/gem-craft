import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const gemCategory = await prisma.gemCategory.create({
      data: {
        name,
      },
    });
    return NextResponse.json(gemCategory);
  } catch (error) {
    console.error("[Gem_Category_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    const gemCategory = await prisma.gemCategory.findMany({});
    return NextResponse.json(gemCategory);
  } catch (error) {
    console.error("[Gem_Category_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
