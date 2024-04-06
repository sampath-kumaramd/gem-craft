"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { CategoryColumn, columns } from "./columns";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface CostingClientProps {
  data: CategoryColumn[];
}

export const CategoryClient: React.FC<CostingClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Category details</h1>
          <p className="text-sm text-gray-400">
            This page is used to manage category details.
          </p>
        </div>
        <Button onClick={() => router.push("category-data/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
