"use client"

import { getCategoryById } from "@/hooks/category";
import { useQuery } from "@tanstack/react-query";
import {  CreateItemType, getItems } from "@/hooks/items";
import { CategoryPageComponent } from "../components/category-page";

interface CategoryPageProps {
  params: { categoryId: string };
}

const CostingPage: React.FC<CategoryPageProps> = ({ params }) => {
  const {
    status,
    error,
    data: costingById,
  } = useQuery({
    queryKey: ["costingById", params.categoryId],
    queryFn: () => getCategoryById(params.categoryId),
  });

  const {data: ItemsData} = useQuery({
    queryKey: ["getItems", params.categoryId],
    queryFn: () => getItems(params.categoryId),
  });

  const itemData:CreateItemType[] = [];
  if (status === "pending") {
    return <div>Loading..</div>;
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
