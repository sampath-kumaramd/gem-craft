import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";
import axios from 'axios';
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const categories = await prisma.category.findMany();
    console.log(categories, 'categories');
    const categoriesWithItems =  await prisma.item.findMany({ });
    return NextResponse.json(categoriesWithItems);
  } catch (err) {
    console.error('[GET_ALL_CATEGORIES_AND_ITEMS]', err);
    return new NextResponse("Internal error", { status: 500 });
  }
}