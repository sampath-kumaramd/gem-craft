"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Item } from "@prisma/client";
import { optional, z } from "zod";
import TSForm, { colorSelectSchema, optionalColorSelectSchema } from "@/components/ui/form";
import { CreateItemType, ItemType } from "@/hooks/items";

interface ItemsFormProps {
  initialData: Item;
  categoryId: string;
  itemId: string;
}

export const ItemsFrom: React.FC<ItemsFormProps> = ({
  initialData,
  categoryId,
  itemId,
}) => {
  const itemSchema = z.object({
    name: z.string().describe("Name // sample name"),
    shape: z.string().describe(" Shape // sample name"),
    texture: z.string().describe("Texture // sample name"),
    colors: colorSelectSchema,
    // material: z.array(z.string()).describe("Materials // sample name"),
    //
    natural: z.boolean().describe("Natural // sample name"),
  });

  const optionalItemSchema = z.object({
    name: z.string().optional().describe("Name // sample name"),
    shape: z.string().optional().describe(" Shape // sample name"),
    texture: z.string().optional().describe("Texture // sample name"),
    colors: optionalColorSelectSchema,
    // material: z
    //   .array(z.string())
    //   .optional()
    //   .describe("Materials // sample name"),
    //
    natural: z.boolean().optional().describe("Natural // sample name"),
  });

  const itemData: CreateItemType = {
    name: "",
    categoryId: "",
    type: ItemType.GEM,
    material: [],
    natural: false,
    shape: "",
    texture: "",
    colors: [],
  };

  function handleSubmit(data: CreateItemType) {
    console.log("handleSubmit", data);

    itemData.name = data.name;
    itemData.categoryId = categoryId;
    itemData.type = ItemType.GEM;
    itemData.material = data.material;
    itemData.natural = data.natural;
    itemData.shape = data.shape;
    itemData.texture = data.texture;
    itemData.colors = data.colors;
    console.log(itemData);
  }

  const label: string = initialData ? "Edit item Data" : "Create item Data";

  return (
    <>
      <TSForm
        schema={initialData ? optionalItemSchema : itemSchema}
        //@ts-ignore
        onSubmit={initialData ? handleSubmit : handleSubmit}
        renderAfter={() => (
          <div className="flex justify-end">
            <Button className="mt-3">Cancel</Button>
            <Button className="mx-2 mt-3" type="submit">
              Create item Data
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
          initialData
            ? {
                name: {
                  label2: "Name for a gemstone or a metal.",
                  afterElement: <Separator />,
                },
                // material: {
                //   label2: "A quick snapshot of your company.",
                //   afterElement: <Separator />,
                // },
                natural: {
                  // label2: "A quick snapshot of your company.",
                  afterElement: <Separator />,
                },
                shape: {
                  label2: "A quick snapshot of your company.",
                  afterElement: <Separator />,
                },
                texture: {
                  label2: "A quick snapshot of your company.",
                  afterElement: <Separator />,
                },
                colors: {
                  label2: "A quick snapshot of your company.",
                  afterElement: <Separator />,
                },
              }
            : {
                name: {
                  label2: "Name for a gemstone or a metal.",
                  afterElement: <Separator />,
                },
                // material: {
                //   label2: "A quick snapshot of your company.",
                //   afterElement: <Separator />,
                // },
                natural: {
                  // label2: "A quick snapshot of your company.",
                  afterElement: <Separator />,
                },
                shape: {
                  label2: "A quick snapshot of your company.",
                  afterElement: <Separator />,
                },
                texture: {
                  label2: "A quick snapshot of your company.",
                  afterElement: <Separator />,
                },
                colors: {
                  label2: "A quick snapshot of your company.",
                  afterElement: <Separator />,
                },
              }
        }
      />
    </>
  );
};
