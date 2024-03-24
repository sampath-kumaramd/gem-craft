"use client";

import { getCategoryById } from "@/hooks/category";
import { useQuery } from "@tanstack/react-query";
import { getItemById } from "@/hooks/items";
import { Sidebar } from "@/components/sidebar";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ItemPage({
    params,
}: {
    params: { categoryId: string; itemId: string };
}) {
    const {
        status,
        error,
        data: categoryById,
    } = useQuery({
        queryKey: ["categoryById", params.categoryId],
        queryFn: () => getItemById(params.itemId, params.categoryId),
    });
    const router = useRouter();
    if (status === "pending") {
        return <div>Loading...</div>;
    }
    if (status === "error") {
        return <div> {JSON.stringify(error)} </div>;
    }

    return (
        <>
            <div className="hidden md:block">
                <div className="border-t">
                    <div className="bg-background">
                        <div className="grid lg:grid-cols-8">
                            <Sidebar className="hidden lg:block" />
                            <div className="col-span-7 lg:col-span-7 lg:border-l">
                                <div className="h-full px-2 py-6 lg:px-8">
                                    <div className="relative">
                                        <div className="mb-5 flex text-2xl font-semibold tracking-tight mt-8">
                                            {categoryById.name} Details


                                        </div>
                                        <Image src={categoryById.image || 'https://placehold.co/600x400'} width={400} height={400} alt="image of the Item " />

                                        <div className="mt-5">

                                            {categoryById.active}
                                            {categoryById.description}
                                            {categoryById.dimensions}
                                            {categoryById.weight?.toString()}
                                            {categoryById.type}
                                            {categoryById.texture}
                                            {categoryById.price?.toString()}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemPage;