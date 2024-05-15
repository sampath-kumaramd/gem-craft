import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const categoriesWithItems =  await prisma.item.findMany({ });
    console.log(categoriesWithItems, 'categoriesWithItems');
    return NextResponse.json(categoriesWithItems);
  } catch (err) {
    console.error('[GET_ALL_CATEGORIES_AND_ITEMS]', err);
    return new NextResponse("Internal error", { status: 500 });
  }
}