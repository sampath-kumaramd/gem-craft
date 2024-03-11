import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { gemId: string } }
) {
  try {
    if (!params.gemId) {
      return new NextResponse("Gem Id is required", { status: 400 });
    }

    const gem = await prisma.gem.findUnique({
      where: {
        id: params.gemId,
      },
    });

    return NextResponse.json(gem);
  } catch (err) {
    console.error("[Gem_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { gemId: string; gemCategoryId: string } }
) {
  try {
    // const { userId } = auth();
    const body = await req.json();

    const {
      name,
      description,
      image,
      price,
      stock,
      material,
      natural,
      shape,
      texture,
      colors,
      weight,
      quantity,
      active,
      dimensions,
    } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!params.gemId) {
      return new NextResponse("Gem Id is required", { status: 400 });
    }

    const gem = await prisma.gem.update({
      where: {
        id: params.gemId,
      },
      data: {
        name,
        description,
        image,
        price,
        stock,
        material,
        natural,
        shape,
        texture,
        colors,
        weight,
        quantity,
        active,
        dimensions,
      },
    });
    return NextResponse.json(gem);
  } catch (error) {
    console.error("[Gem_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { gemId: string; gemCategoryId: string } }
) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!params.gemId) {
      return new NextResponse("Gem Id is required", { status: 400 });
    }

    const gem = await prisma.gem.delete({
      where: {
        id: params.gemId,
      },
    });

    return NextResponse.json(gem);
  } catch (err) {
    console.error("[Gem_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
