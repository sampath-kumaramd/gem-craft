"use client";

import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import { Category } from "@prisma/client";
import { Item } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ItemColumn, columns } from "./columns";
import { Edit, Plus } from "lucide-react";

interface CategoryDataFormProps {
  initialData: Category;
  initialItemsData: Item[] | undefined;
}

export const CategoryPageComponent: React.FC<CategoryDataFormProps> = ({
  initialData,
  initialItemsData,
}) => {
  const router = useRouter();
  if (initialItemsData === undefined) {
    return <div>loading</div>;
  }
  const processedData: ItemColumn[] = initialItemsData.map(item => ({
    ...item,
    categoryId: item.categoryId || '',
  }));
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
                    <Button onClick={() => router.push("items/new")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Item
                    </Button>

                    <div className="mb-5 flex text-2xl font-semibold tracking-tight mt-8">
                      Items in - {initialData.name}
                      <p
                        onClick={() =>
                          router.push(`/category-data/${initialData.id}`)
                        }
                      >
                        <Edit className="ml-6 h-4 w-4" />
                      </p>
                    </div>
                    <div className="mb-5 mt-5">List of Items Data</div>
                    <DataTable columns={columns} data={processedData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
