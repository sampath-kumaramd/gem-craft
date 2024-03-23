"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Item } from "@prisma/client";
import { optional, z } from "zod";
import TSForm, {
  colorSelectSchema,
  descriptionSchema,
  imageUploadSchema,
  itemTypeSelectSchema,
  optionalColorSelectSchema,
  optionalDescriptionSchema,
  optionalImageUploadSchema,
  optionalItemTypeSelectSchema,
} from "@/components/ui/form";
import { CreateItemType, EditItem, ItemType, createItem, deleteItems } from "@/hooks/items";
import { Sidebar } from "@/components/sidebar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

    shape: z.string().describe(" Shape // sample name"),
    texture: z.string().describe("Texture // sample name"),

    // colors: colorSelectSchema,
    // material: z.array(z.string()).describe("Materials // sample name"),
    //
    natural: z.boolean().describe("Natural // sample name"),
  });

  const optionalItemSchema = z.object({
    type: optionalItemTypeSelectSchema,
    name: z.string().optional().describe("Name // sample name"),

    description: optionalDescriptionSchema,
    image: optionalImageUploadSchema,
    price: z.number().optional().describe("Price // sample price"),
    stock: z.string().optional().describe("Stock // sample stock"),
    material: z.string().optional().describe("Material // sample material"),
    weight: z.number().optional().describe("Weight // sample weight"),
    quantity: z.number().optional().describe("Quantity // sample quantity"),
    dimensions: z.string().optional().describe("Dimensions // sample dimensions"),

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

  const itemType = {
    GEM: "GEM",
    PENDANT: "PENDANT",
  };

  const queryClient = useQueryClient();
  const router = useRouter();

  const createCategoryMutation = useMutation({
    mutationFn: createItem,
    onSuccess: (data) => {
      queryClient.setQueryData(["category"], data);
      queryClient.invalidateQueries({ queryKey: ["category"], exact: true });
      router.refresh();
      router.push(`/category-data/${categoryId}/category`);
      toast.success("item Created Successfully");
    },
  });

  // function handleSubmit(data: z.infer<typeof caregorySchema>) {
  //   createCategoryMutation.mutate({
  //     id: categoryCreateId,
  //     name: data.name,
  //     //@ts-ignore
  //     type: data.type,
  //   });
  // }

  // const createCategoryUpdateMutations = useMutation({
  //   mutationFn: updateCategory,
  //   onSuccess: (data: z.infer<typeof caregorySchema>) => {
  //     queryClient.setQueryData(["category"], data);
  //     queryClient.invalidateQueries({ queryKey: ["category"], exact: true });
  //     router.refresh();
  //     router.push(`/category-data`);
  //     toast.success("Category Updated Successfully");
  //   },
  // });

  // function handleEditSubmit(initialData: EditItem) {
  //   deleteItems(categoryId);
  //   createCategoryUpdateMutations.mutate({
  //     id: itemId,
  //     ...initialData,
  //   });
  // }

  const handleCancel = () => {
    router.push("/category-data");
  };

  function handleSubmit(data: CreateItemType) {
    itemData.colors = ["red", "blue", "green", "yellow", "black", "white", "brown", "orange", "purple", "pink", "gray", "gold"]
    itemData.name = data.name;
    itemData.categoryId = categoryId;
    itemData.type = data.type;
    itemData.material = ["gold", "silver", "platinum", "copper", "brass", "bronze",];
    itemData.natural = data.natural;
    itemData.shape = data.shape;
    itemData.texture = data.texture;
    itemData.active = true
    itemData.image = data.image
    console.log("handleSubmit", data);
    console.log(itemData);

    // createItemMutation.mutate(itemData);
    createCategoryMutation.mutate({
      name: data.name,
      //@ts-ignore
      type: data.type,
      colors: itemData.colors,
      material: itemData.material,
      natural: data.natural,
      shape: data.shape,
      texture: data.texture,
      categoryId: itemData.categoryId,
      active:itemData.active,
      image:data.image
      
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
                      renderBefore={() => <></>}
                      defaultValues={{}}
                      //@ts-ignore
                      props={
                        initialData
                          ? {
                            name: {
                              label2: "gems name.",
                              afterElement: <Separator />,
                            },
                            // material: {
                            //   label2: "",
                            //   afterElement: <Separator />,
                            // },
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
                            }
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
