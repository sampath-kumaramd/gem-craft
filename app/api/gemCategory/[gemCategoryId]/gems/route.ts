import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { gemCategoryId: string } }
) {
  try {
    const { userId } = auth();
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

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.gemCategoryId) {
      return new NextResponse("Gem Category Id is required", { status: 400 });
    }

    const gem = await prisma.gem.create({
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
        categoryId: params.gemCategoryId,
      },
    });

    return NextResponse.json(gem);
  } catch (error) {
    console.error("[Gems_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { gemCategoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.gemCategoryId) {
      return new NextResponse("Gem Category Id is required", { status: 400 });
    }

    const gems = await prisma.gem.findMany({
      where: {
        categoryId: params.gemCategoryId,
      },
    });

    return NextResponse.json(gems);
  } catch (error) {
    console.error("[Gems_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { gemCategoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const gems = await prisma.gem.deleteMany({
      where: {
        categoryId: params.gemCategoryId,
      },
    });

    return NextResponse.json(gems);
  } catch (err) {
    console.error("[Gem_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
