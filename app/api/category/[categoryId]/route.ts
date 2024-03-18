import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params } : { params: { categoryId: string } }
) {
    try{
        if(!params.categoryId){
            return new NextResponse("item Category Id is required", { status: 400 });
        }
        const Category = await prisma.category.findUnique({
            where:{
                id: params.categoryId,
            },
        });
        return NextResponse.json(Category);
    } catch (err) {
        console.error('[item_Category_GET]', err);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params } : { params: { categoryId: string } }
){
    try{
        // const { userId } = auth();
        const body = await req.json();

        const { name } = body;

        // if(!userId){
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        if(!name){
            return new NextResponse("Name is required", { status: 400 });
        }

        if(!params.categoryId){
            return new NextResponse("item Category Id is required", { status: 400 });
        }

        const Category = await prisma.category.updateMany({
            where:{
                id: params.categoryId,
            },
            data:{
                name
            }
        });
        return NextResponse.json(Category);
    } catch(error) {
        console.error('[item_Category_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE(
    request: Request,
    { params } : { params: { categoryId: string } }
) {
    try{
        // const { userId } = auth();
       
        // if(!userId){
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        if(!params.categoryId){
            return new NextResponse("item Category Id is required", { status: 400 });
        }
      
        const Category = await prisma.category.delete({
            where:{
                id: params.categoryId,
            },
        });

        return NextResponse.json(params.categoryId);
    } catch (err) {
        console.error('[item_Category_DELETE]', err);
        return new NextResponse("Internal error", { status: 500 });
    }
};