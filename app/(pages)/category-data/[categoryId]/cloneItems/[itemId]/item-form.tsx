"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TSForm, {
  descriptionSchema,
  imageUploadSchema,
  itemTypeSelectSchema,
} from "@/components/ui/form";
import { Sidebar } from "@/components/sidebar";
import { CreateItemType, EditItem, ItemType, createItem, deleteItems, updateItem } from "@/hooks/items";

import { useEffect } from "react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Item } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

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
    type: itemTypeSelectSchema,
    name: z.string().describe("Name // sample name"),
    description: descriptionSchema,
    image: imageUploadSchema,
    price: z.number().describe("Price // sample price"),
    stock: z.string().describe("Stock // sample stock"),
    material: z.string().describe("Material // sample material"),
    weight: z.number().describe("Weight // sample weight"),
    quantity: z.number().describe("Quantity // sample quantity"),
    dimensions: z.string().describe("Dimensions // sample dimensions"),
    shape: z.string().describe(" Shape // sample shape"),
    texture: z.string().describe("Texture // sample texture"),
    natural: z.boolean().describe("Natural // sample natural"),

    // colors: colorSelectSchema,
    // material: z.array(z.string()).describe("Materials // sample name"),
    //
  });

  // const optionalItemSchema = z.object({
  //   type: optionalItemTypeSelectSchema,
  //   name: z.string().optional().describe("Name // sample name"),
  //   description: optionalDescriptionSchema,
  //   image: optionalImageUploadSchema,
  //   price: z.number().optional().describe("Price // sample price"),
  //   stock: z.string().optional().describe("Stock // sample stock"),
  //   material: z.string().optional().describe("Material // sample material"),
  //   weight: z.number().optional().describe("Weight // sample weight"),
  //   quantity: z.number().optional().describe("Quantity // sample quantity"),
  //   dimensions: z.string().optional().describe("Dimensions // sample dimensions"),
  //   shape: z.string().optional().describe(" Shape // sample shape"),
  //   texture: z.string().optional().describe("Texture // sample texture"),
  //   colors: optionalColorSelectSchema,
  //   // material: z
  //   //   .array(z.string())
  //   //   .optional()
  //   //   .describe("Materials // sample name"),
  //   //
  //   natural: z.boolean().optional().describe("Natural // sample natural"),
  // });

  const itemData: CreateItemType = {
    name: "",
    categoryId: "",
    type: ItemType.BEADS,
    material: ["gold", "silver", "platinum"],
    natural: false,
    shape: "",
    texture: "",
    colors: [],
    active: true,
    // image: "",
    // price: 0,
    // stock: "",
    // weight: 0,
    // quantity: 0,
    // dimensions: "",
  };

  const itemType = {
    BEADS: "Beads",
    PENDANTS: "Pendants",
    DROPS: "Drops",
    LINKS: "Links",
  };

  const queryClient = useQueryClient();
  const router = useRouter();

  const createItemMutation = useMutation({
    mutationFn: createItem,
    onSuccess: (data) => {
      queryClient.setQueryData(["items"], data);
      queryClient.invalidateQueries({ queryKey: ["items"], exact: true });
      queryClient.invalidateQueries({ queryKey: ["items_getAllItems"], exact: true });
      router.refresh();
      router.push(`/category-data/${categoryId}/items`);
      toast.success("item Created Successfully");
    },
  });

  // function handleSubmit(data: z.infer<typeof caregorySchema>) {
  //   createItemMutation.mutate({
  //     id: categoryCreateId,
  //     name: data.name,
  //     //@ts-ignore
  //     type: data.type,
  //   });
  // }

  const createItemUpdateMutations = useMutation({
    mutationFn: updateItem,
    onSuccess: (data: z.infer<typeof itemSchema>) => {
      queryClient.setQueryData(["items"], data);
      queryClient.invalidateQueries({ queryKey: ["items"], exact: true });
      queryClient.invalidateQueries({ queryKey: ["items_getAllItems"], exact: true });
      router.refresh();
      router.push(`/category-data/${categoryId}/items`);
      toast.success("item Created Successfully");
    },
  });

  function handleEditSubmit(initialData: EditItem) {
    console.log("initialData edit data", initialData);
    createItemUpdateMutations.mutate({
      id: itemId,
      ...initialData,
      material: ["gold", "silver", "platinum"],
    });
  }

  const handleCancel = () => {
    router.push("/category-data");
  };

  useEffect(() => {
    if (initialData) {
      console.log("initialData", initialData);
    }
  })

  function handleSubmit(data: CreateItemType) {
    itemData.colors = ["red"], ["blue"], ["green"]
    itemData.name = data.name;
    itemData.categoryId = categoryId;
    itemData.type = data.type;
    itemData.material = ["gold", "silver", "platinum", "copper", "brass", "bronzess"];
    itemData.natural = data.natural;
    itemData.shape = data.shape;
    itemData.texture = data.texture;
    itemData.active = true
    itemData.image = data.image
    itemData.price = data.price
    itemData.stock = data.stock
    itemData.weight = data.weight
    itemData.quantity = data.quantity
    itemData.dimensions = data.dimensions
    console.log("handleSubmit", data);
    console.log(itemData);

    // createItemMutation.mutate(itemData);
    createItemMutation.mutate({
      name: data.name,
      //@ts-ignore
      type: data.type,
      colors: itemData.colors,
      material: itemData.material,
      natural: data.natural,
      shape: data.shape,
      texture: data.texture,
      categoryId: itemData.categoryId,
      active: itemData.active,
      image: data.image,
      price: data.price,
      stock: data.stock,
      weight: data.weight,
      quantity: data.quantity,
      dimensions: data.dimensions,
    });
  }

  const label: string = initialData ? "Edit item Data" : "Create item Data";

  return (
    <>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-8">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-7 lg:col-span-7 lg:border-l">
                <div className="h-full px-2 py-6 lg:px-8 w-9/12">
                  <div className="relative">
                    <div className="mb-5 text-2xl font-semibold tracking-tight">
                      Create a items
                    </div>
                    <TSForm
                      schema={itemSchema}
                      //@ts-ignore
                      onSubmit={handleSubmit}
                      renderAfter={() => (
                        <>
                          <div className="flex justify-end">
                            <Button className="mt-3" onClick={handleCancel}>Cancel</Button>
                            {createItemMutation.isPending ||
                              createItemMutation.isPending ? (
                              <Button
                                disabled
                                className="mx-2 mt-3"
                                type="submit"
                              >
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                               Clone Item
                              </Button>
                            ) : (
                              <Button className="mx-2 mt-3" type="submit">
                               Clone Item
                              </Button>
                            )}
                          </div>
                        </>
                      )}
                      renderBefore={() => <></>}
                      defaultValues={
                        initialData
                          ? {
                            name: initialData.name,
                            type: initialData.type,
                            description: initialData.description || '',
                            image: initialData.image || '',
                            price: initialData.price
                              ? typeof initialData.price === 'string'
                                ? parseFloat(initialData.price)
                                : initialData.price.toNumber()
                              : undefined,
                            stock: initialData.stock?.toString() || '',
                            material: initialData.material?.toString() || '',
                            weight: initialData.weight
                              ? typeof initialData.weight === 'string'
                                ? parseFloat(initialData.weight)
                                : initialData.weight.toNumber()
                              : undefined,
                            quantity: initialData.quantity || 0,
                            dimensions: initialData.dimensions || '',
                            shape: initialData.shape,
                            texture: initialData.texture,
                            natural: initialData.natural
                          }
                          :
                          {}}
                      //@ts-ignore
                      props={
                        initialData
                          ? {
                            name: {
                              label2: "gems name.",
                              afterElement: <Separator />,
                            },
                            material: {
                              label2: "",
                              afterElement: <Separator />,
                            },
                            natural: {
                              // label2: "",
                              afterElement: <Separator />,
                            },
                            shape: {
                              label2: "",
                              afterElement: <Separator />,
                            },
                            texture: {
                              label2: "",
                              afterElement: <Separator />,
                            },
                            type: {
                              data: { data: itemType }
                            },
                            // colors: {
                            //   label2: "",
                            //   afterElement: <Separator />,
                            // },
                          }
                          : {
                            name: {
                              label2: "gems name.",
                              afterElement: <Separator />,
                            },
                            // material: {
                            //   label2: "",
                            //   afterElement: <Separator />,
                            // },
                            // natural: {
                            //   // label2: "",
                            //   afterElement: <Separator />,
                            // },
                            shape: {
                              label2: "shape of the gem.",
                              afterElement: <Separator />,
                            },
                            texture: {
                              label2: " texture of the gem.",
                              afterElement: <Separator />,
                            },
                            type: {
                              data: { data: itemType }
                            }
                            // colors: {
                            //   label2: " colors of the gem.",
                            //   afterElement: <Separator />,
                            // },
                          }
                      }
                    />
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
