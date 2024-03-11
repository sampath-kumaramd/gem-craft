import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params } : { params: { gemCategoryId: string } }
) {
    try{
        if(!params.gemCategoryId){
            return new NextResponse("Gem Category Id is required", { status: 400 });
        }
        const gemCategory = await prisma.gemCategory.findUnique({
            where:{
                id: params.gemCategoryId,
            },
        });
        return NextResponse.json(gemCategory);
    } catch (err) {
        console.error('[Gem_Category_GET]', err);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params } : { params: { gemCategoryId: string } }
){
    try{
        const { userId } = auth();
        const body = await req.json();

        const { name } = body;

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!name){
            return new NextResponse("Name is required", { status: 400 });
        }

        if(!params.gemCategoryId){
            return new NextResponse("Gem Category Id is required", { status: 400 });
        }

        const gemCategory = await prisma.gemCategory.updateMany({
            where:{
                id: params.gemCategoryId,
            },
            data:{
                name
            }
        });
        return NextResponse.json(gemCategory);
    } catch(error) {
        console.error('[Gem_Category_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE(
    request: Request,
    { params } : { params: { gemCategoryId: string } }
) {
    try{
        const { userId } = auth();
       
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!params.gemCategoryId){
            return new NextResponse("Gem Category Id is required", { status: 400 });
        }
      
        const gemCategory = await prisma.gemCategory.delete({
            where:{
                id: params.gemCategoryId,
            },
        });

        return NextResponse.json(params.gemCategoryId);
    } catch (err) {
        console.error('[Gem_Category_DELETE]', err);
        return new NextResponse("Internal error", { status: 500 });
    }
};