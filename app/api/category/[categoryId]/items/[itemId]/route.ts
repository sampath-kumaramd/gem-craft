import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    if (!params.itemId) {
      return new NextResponse("item Id is required", { status: 400 });
    }

    const item = await prisma.item.findUnique({
      where: {
        id: params.itemId,
      },
    });

    return NextResponse.json(item);
  } catch (err) {
    console.error("[item_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { itemId: string; itemCategoryId: string } }
) {
  try {
    // const { userId } = auth();
    const body = await req.json();

    const {
      name,
      type,
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

    if (!params.itemId) {
      return new NextResponse("item Id is required", { status: 400 });
    }

    const item = await prisma.item.update({
      where: {
        id: params.itemId,
      },
      data: {
        name,
        type,
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
    return NextResponse.json(item);
  } catch (error) {
    console.error("[item_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { itemId: string; itemCategoryId: string } }
) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!params.itemId) {
      return new NextResponse("item Id is required", { status: 400 });
    }

    const item = await prisma.item.delete({
      where: {
        id: params.itemId,
      },
    });

    return NextResponse.json(item);
  } catch (err) {
    console.error("[item_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
