import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";
import axios from 'axios';
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const categories = await prisma.category.findMany();
    console.log(categories);
    console.log("categories");

    const categoriesWithItems = await Promise.all(
      categories.map(async (category) => {
        return axios.get<Item[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${category.id}/items`)
          .then((res) => res.data)
          .catch((err) => {
            console.error('[GET_CATEGORY_ITEMS]', err);
            return { error: "Internal error", status: 500 };
          });
      })
    );

    return NextResponse.json(categoriesWithItems);
  } catch (err) {
    console.error('[GET_ALL_CATEGORIES_AND_ITEMS]', err);
    return new NextResponse("Internal error", { status: 500 });
  }
}