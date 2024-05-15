import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const categoriesWithItems = await prisma.item.findMany({});
    console.log(categoriesWithItems, 'categoriesWithItems');

    const response = NextResponse.json(categoriesWithItems);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  } catch (err) {
    console.error('[GET_ALL_CATEGORIES_AND_ITEMS]', err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
