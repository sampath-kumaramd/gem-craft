"use client";

import { getCategoryById } from "@/hooks/category";
import { CreateItemType, ItemType, getItems } from "@/hooks/items";
// import { CostingFrom } from "./components/costing-form";
// import { getCostingDataById } from "@/hooks/costing-data";
import { useQuery } from "@tanstack/react-query";
import { CategoryFrom } from "./components/category-form";
// import { createItemType, getItems } from "@/hooks/items";

export function CategoryPage({ params }: { params: { categoryId: string } }) {
  const {
    status,
    error,
    data: categoryById,
  } = useQuery({
    queryKey: ["categoryById", params.categoryId],
    queryFn: () => getCategoryById(params.categoryId),
  });

  const { data: ItemsData } = useQuery({
    queryKey: ["getItems", params.categoryId],
    queryFn: () => getItems(params.categoryId),
  });

  const itemData: CreateItemType[] = [];

//   if (ItemsData) {
//     ItemsData.map((item) => {
//       itemData.push({
//         type: ItemType.GEM, // or ItemType.PENDANT
//         name: item.name,
//         description: "description", // optional
//         image: "image_url", // optional
//         price: item.price,
//         stock: 10, // optional
//         material: ["material1", "material2"],
//         natural: true,
//         shape: "shape",
//         texture: "texture",
//         colors: ["color1", "color2"],
//         weight: 1.0, // optional
//         quantity: 1, // optional
//         active: true, // optional
//         dimensions: "dimensions", // optional
//         categoryId: categoryId,
//       });
//     });
//   }

  const itemDataCount = 9;
  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div> {JSON.stringify(error)} </div>;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 ">
        <CategoryFrom
          initialData={categoryById}
          initialItemsData={itemData}
          categoryId={params.categoryId}
        />
      </div>
    </div>
  );
}

export default CategoryPage;
