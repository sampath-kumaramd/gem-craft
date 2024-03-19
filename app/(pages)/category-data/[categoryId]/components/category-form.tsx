"use client";

import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import uniqid from "uniqid";
import { createItem, CreateItemType, deleteItems } from "@/hooks/items";
import { Category } from "@prisma/client";
import TSForm from "@/components/ui/form";
import { createCategory, EditCategory, updateCategory } from "@/hooks/category";
import ArrayRenderer from "@/components/array-render";
import { ItemFromComponent } from "./item-form-component";

interface CategoryFormProps {
  initialData: Category | null;
  categoryId: string;
}

export const CategoryFrom: React.FC<CategoryFormProps> = ({
  initialData,
  categoryId,
}) => {
  const router = useRouter();
  const [categoryCreateId, setcategoryCreateId] = useState(uniqid());

  const caregorySchema = z.object({
    name: z.string().describe("Caregory Name // sample name"),
  });

  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      queryClient.setQueryData(["category"], data);
      // queryClient.invalidateQueries(["category"], { exact: true });
      router.refresh();
      router.push(`/category-data`);
      toast.success("toastMessage");
    },
  });

  function handleSubmit(data: z.infer<typeof caregorySchema>) {
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
    createCategoryUpdateMutations.mutate({
      id: categoryId,
      ...initialData,
    });
  }

  const categoryIdForItems = initialData ? categoryId : categoryCreateId;

  const label: string = initialData
    ? "Edit Category Data"
    : "Create Category Data";

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
                              name: {},
                            }
                          : {
                              name: {},
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
