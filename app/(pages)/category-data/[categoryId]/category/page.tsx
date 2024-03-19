"use client"

import { getCategoryById } from "@/hooks/category";
import { useQuery } from "@tanstack/react-query";
import {  CreateItemType, getItems } from "@/hooks/items";
import { CategoryPageComponent } from "../components/category-page";
// import { CostingPageComponent } from "../components/costing-page";

export function CostingPage  ({ params }: { params: { costingId: string } }){
  const {
    status,
    error,
    data: costingById,
  } = useQuery({
    queryKey: ["costingById", params.costingId],
    queryFn: () => getCategoryById(params.costingId),
  });

  const {data: ItemsData} = useQuery({
    queryKey: ["getItems", params.costingId],
    queryFn: () => getItems(params.costingId),
  });

  const itemData:CreateItemType[] = [];
  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div> {JSON.stringify(error)} </div>;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 ">
        <CategoryPageComponent initialData={costingById} initialItemsData={ItemsData}  />
      </div>
    </div>
  );
};

export default CostingPage;
