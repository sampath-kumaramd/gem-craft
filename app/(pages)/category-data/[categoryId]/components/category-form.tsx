"use client";

import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
// import { CostingData } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import {
//   EitCostingData,
//   createCostingData,
//   updateCostingData,
// } from "@/hooks/category";
import { Loader2 } from "lucide-react";
import uniqid from "uniqid";
import { createItem, CreateItemType, deleteItems } from "@/hooks/items";
// import { ItemFromComponent } from "./item-form-component";
import { Category } from "@prisma/client";
import TSForm from "@/components/ui/form";
import { createCategory, EditCategory, updateCategory } from "@/hooks/category";
import ArrayRenderer from "@/components/array-render";
import { ItemFromComponent } from "./item-form-component";

interface CategoryFormProps {
  initialData: Category | null;
  initialItemsData: CreateItemType[] | undefined;
  categoryId: string;
}

export const CategoryFrom: React.FC<CategoryFormProps> = ({
  initialData,
  initialItemsData,
  categoryId,
}) => {
  const router = useRouter();

  const caregorySchema = z.object({
    name: z.string().describe("Caregory Name // sample name"),
  });

  const queryClient = useQueryClient();
  const [categoryCreateId, setcategoryCreateId] = useState(uniqid());
  const createItemMutation = useMutation({
    mutationFn: createItem,
    onSuccess: (itemsData) => {
      queryClient.setQueryData(["getItems"], itemsData);
      //   queryClient.invalidateQueries(["getItems"], { exact: true });
      router.refresh();
      toast.success("toastMessage");
      console.log(itemsData, "sfdfs");
      console.log(itemsData, "data");
    },
  });

  const [itemsData, setItemsData] = useState<CreateItemType[]>([]);

  const [initialItemsDataArray, setInitialItemsDataArray] = useState<
    CreateItemType[]
  >([]);

  useEffect(() => {
    if (initialItemsData) {
      setInitialItemsDataArray(initialItemsData);
      setItemsData(initialItemsData);
    }
  }, [initialItemsData]);

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      queryClient.setQueryData(["category"], data);
      //   queryClient.invalidateQueries(["category"], { exact: true });
      router.refresh();
      router.push(`/category-data`);
      toast.success("toastMessage");
      console.log(data, "sfdfs");
    },
  });

  function handleSubmit(data: z.infer<typeof caregorySchema>) {
    itemsData.map((item) => submitItems(item));
    console.log(data, "data");
    createCategoryMutation.mutate({
      id: categoryCreateId,
      name: data.name,
    });
  }

  const createCategoryUpdateMutations = useMutation({
    mutationFn: updateCategory,
    onSuccess: (data: z.infer<typeof caregorySchema>) => {
      queryClient.setQueryData(["category"], data);
      //   queryClient.invalidateQueries(["category"], { exact: true });
      router.refresh();
      router.push(`/category-data`);
      toast.success("toastMessage");
      console.log(data, "sfdfs");
    },
  });

  function handleEditSubmit(initialData: EditCategory) {
    deleteItems(categoryId);
    itemsData.map((item) => submitItems(item));
    createCategoryUpdateMutations.mutate({
      id: categoryId,
      ...initialData,
    });
  }

  const categoryIdForItems = initialData ? categoryId : categoryCreateId;

  function submitItems(itemsData: CreateItemType) {
    console.log(itemsData, "itemsData");
    createItemMutation.mutate({
      ...itemsData,
      categoryId: categoryIdForItems,
    });
  }

  const label: string = initialData
    ? "Edit Costing Data"
    : "Create Costing Data";

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...itemsData];
    updatedItems.splice(index, 1);
    setItemsData(updatedItems);
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-8">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-7 lg:col-span-7 lg:border-l">
                <div className="h-full px-2 py-6 lg:px-8">
                  <div className="relative">
                    <div className="mb-5 text-2xl font-semibold tracking-tight">
                      Create Costing Data
                    </div>
                    <TSForm
                      schema={caregorySchema}
                      //@ts-ignore
                      onSubmit={initialData ? handleEditSubmit : handleSubmit}
                      renderAfter={() => (
                        <>
                          <div className="mb-5">
                            {" "}
                            <Separator />
                          </div>
                          <ArrayRenderer
                            values={itemsData}
                            onRemove={handleRemoveItem}
                          />
                          <ItemFromComponent
                            initialItemsData={initialItemsData}
                            categoryId={categoryId}
                            itemsData={itemsData}
                            setItemsData={setItemsData}
                            initialItemsDataArray={initialItemsDataArray}
                            setInitialItemsDataArray={setInitialItemsDataArray}
                          />
                          <div className="flex justify-end">
                            <Button className="mt-3">Cancel</Button>

                            {createCategoryMutation.isPending ||
                            createCategoryUpdateMutations.isPending ? (
                              <Button
                                disabled
                                className="mx-2 mt-3"
                                type="submit"
                              >
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {label}
                              </Button>
                            ) : (
                              <Button className="mx-2 mt-3" type="submit">
                                {label}
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
                            }
                          : {}
                      }
                      //@ts-ignore
                      props={
                        initialData
                          ? {
                              name: {
                                label2:
                                  "This will be displayed on your profile.",
                                afterElement: <Separator />,
                              },
                            }
                          : {
                              name: {
                                label2:
                                  "This will be displayed on your profile.",
                                afterElement: <Separator />,
                              },
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
