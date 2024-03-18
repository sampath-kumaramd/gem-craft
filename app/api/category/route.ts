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

    const Category = await prisma.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json(Category);
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
    const Category = await prisma.category.findMany({});
    return NextResponse.json(Category);
  } catch (error) {
    console.error("[Gem_Category_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
