import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // const { userId } = auth();
    const body = await req.json();
    const { name , description , status,shareLink, chainColor, userId } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!chainColor) {
      return new NextResponse("Chain color is required", { status: 400 });
    }
    if (!userId) {
      return new NextResponse("User is required", { status: 400 });
    }

    const jewelry = await prisma.jewelry.create({
      data: {
        name,
        description,
        chainColor,
        userId,
        status,
        shareLink
      },
    });
    return NextResponse.json(jewelry);
  } catch (error) {
    console.error("[jewelry_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    const jewelry = await prisma.jewelry.findMany({});
    return NextResponse.json(jewelry);
  } catch (error) {
    console.error("[jewelry_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
