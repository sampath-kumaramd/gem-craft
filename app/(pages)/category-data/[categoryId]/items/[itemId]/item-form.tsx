"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Item } from "@prisma/client";
import { z } from "zod";
import TSForm from "@/components/ui/form";
import { CreateItemType, ItemType } from "@/hooks/items";

interface ItemsFormProps {
  initialItemsData: Item[];
  itemsData: CreateItemType[];
  categoryId: string;
  setItemsData: Function;
}

export const ItemsFrom: React.FC<ItemsFormProps> = ({
  initialItemsData,
  categoryId,
  itemsData,
  setItemsData,
}) => {
  const categotySchema = z.object({
    name: z.string().describe("Costing Name // sample name"),
    price: z.number().describe("Price // sample price"),
  });

  const optionalCostingSchema = z.object({
    name: z.string().describe("Costing Name // sample name").optional(),
    price: z.number().describe("Price // sample price").optional(),
  });

  const itemData: CreateItemType = {
      name: "",
      categoryId: "",
      type: ItemType.GEM,
      material: [],
      natural: false,
      shape: "",
      texture: "",
      colors: []
  };

  function handleSubmit(data: CreateItemType) {
    itemData.name = data.name;
    itemData.price = data.price;
    itemData.categoryId = categoryId;
    setItemsData([...itemsData, itemData]);
    console.log(itemsData, "data");
  }

  const label: string = initialItemsData
    ? "Edit categoty Data"
    : "Create categoty Data";

  return (
    <>
      <TSForm
        schema={initialItemsData ? optionalCostingSchema : categotySchema}
        //@ts-ignore
        onSubmit={initialItemsData ? handleSubmit : handleSubmit}
        renderAfter={() => (
          <div className="flex justify-end">
            <Button className="mt-3">Cancel</Button>
            <Button className="mx-2 mt-3" type="submit">
              Create categoty Data
            </Button>
          </div>
        )}
        renderBefore={() => (
          <div className="text-2xl font-semibold tracking-tight">
            Create Items
          </div>
        )}
        defaultValues={{}}
        //@ts-ignore
        props={
          initialItemsData
            ? {
                name: {
                  label2: "This will be displayed on your profile.",
                  afterElement: <Separator />,
                },
                price: {
                  label2: "A quick snapshot of your company.",
                  afterElement: <Separator />,
                },
              }
            : {
                name: {
                  label2: "This will be displayed on your profile.",
                  afterElement: <Separator />,
                },
                price: {
                  label2: "A quick snapshot of your company.",
                  afterElement: <Separator />,
                },
              }
        }
      />
    </>
  );
};
