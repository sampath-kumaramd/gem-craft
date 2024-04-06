import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    // const { userId } = auth();

    const body = await req.json();
    const {
      name,
      description,
      type,
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

    // Check if the category exists
 
    

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("item Category Id is required", { status: 400 });
    }

    if (!type) {
      return new NextResponse("Type is required", { status: 400 });
    }

    const item = await prisma.item.create({
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
        categoryId: params.categoryId,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("[items_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!params.categoryId) {
      return new NextResponse("item Category Id is required", { status: 400 });
    }

    const items = await prisma.item.findMany({
      where: {
        categoryId: params.categoryId,
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("[items_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const items = await prisma.item.deleteMany({
      where: {
        categoryId: params.categoryId,
      },
    });

    return NextResponse.json(items);
  } catch (err) {
    console.error("[item_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
