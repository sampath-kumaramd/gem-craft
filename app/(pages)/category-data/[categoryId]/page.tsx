"use client";

import React from 'react';
import { getCategoryById } from "@/hooks/category";
import { useQuery } from "@tanstack/react-query";
import { CategoryFrom } from "./components/category-form";

interface CategoryPageProps {
  params: { categoryId: string };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const {
    status,
    error,
    data: categoryById,
  } = useQuery({
    queryKey: ["categoryById", params.categoryId],
    queryFn: () => getCategoryById(params.categoryId),
  });

  if (status === "pending") {
    return <div>Loading... </div>;
  }
  if (status === "error") {
    return <div> {JSON.stringify(error)} </div>;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 ">
        <CategoryFrom
          initialData={categoryById}
          categoryId={params.categoryId}
        />
      </div>
    </div>
  );
}

export default CategoryPage;