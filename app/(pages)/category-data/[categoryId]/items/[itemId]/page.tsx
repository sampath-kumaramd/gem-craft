"use client";

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getItemById } from "@/hooks/items";
import { ItemsFrom } from "./item-form";

interface ItemPageProps {
  params: { categoryId: string; itemId: string };
}

const ItemPage: React.FC<ItemPageProps> = ({ params }) => {
  const {
    status,
    error,
    data: categoryById,
  } = useQuery({
    queryKey: ["categoryById", params.categoryId],
    queryFn: () => getItemById(params.itemId ,params.categoryId),
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div> {JSON.stringify(error)} </div>;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 ">
        <ItemsFrom
          initialData={categoryById}
          categoryId={params.categoryId}
          itemId={params.itemId}
        />
      </div>
    </div>
  );
}

export default ItemPage;