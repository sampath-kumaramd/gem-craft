"use client";

import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import TSForm, { itemTypeSelectSchema } from "@/components/ui/form";
import { deleteItems } from "@/hooks/items";
import { createCategory, EditCategory, updateCategory } from "@/hooks/category";

import { Category } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import uniqid from "uniqid";
import toast from "react-hot-toast";

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

  const itemType = {
    BEADS: "Beads",
    PENDANTS: "Pendants",
    DROPS: "Drops",
    LINKS: "Links",
  };

  const caregorySchema = z.object({
    name: z.string().describe("Caregory Name // sample name"),
    type: itemTypeSelectSchema,
  });

  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      queryClient.setQueryData(["category"], data);
      queryClient.invalidateQueries({ queryKey: ["category"], exact: true });
      router.refresh();
      router.push(`/category-data`);
      toast.success("Category Created Successfully");
    },
  });

  function handleSubmit(data: z.infer<typeof caregorySchema>) {
    createCategoryMutation.mutate({
      id: categoryCreateId,
      name: data.name,
      //@ts-ignore
      type: data.type,
    });
  }

  const createCategoryUpdateMutations = useMutation({
    mutationFn: updateCategory,
    onSuccess: (data: z.infer<typeof caregorySchema>) => {
      queryClient.setQueryData(["category"], data);
      queryClient.invalidateQueries({ queryKey: ["category"], exact: true });
      router.refresh();
      router.push(`/category-data`);
      toast.success("Category Updated Successfully");
    },
  });

  function handleEditSubmit(initialData: EditCategory) {
    deleteItems(categoryId);
    createCategoryUpdateMutations.mutate({
      id: categoryId,
      ...initialData,
    });
  }

  const handleCancel = () => {
    router.push("/category-data");
  };

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
                <div className="h-full px-2 py-6 lg:px-8 w-9/12">
                  <div className="relative">
                    <div className="mb-5 text-2xl font-semibold tracking-tight">
                      Create a category
                    </div>
                    <TSForm
                      schema={caregorySchema}
                      //@ts-ignore
                      onSubmit={initialData ? handleEditSubmit : handleSubmit}
                      renderAfter={() => (
                        <>
                          <div className="flex justify-end">
                            <Button className="mt-3" onClick={handleCancel}>Cancel</Button>
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
                            type: initialData.type,
                          }
                          : {}
                      }
                      //@ts-ignore
                      props={
                        initialData
                          ? {
                            name: {},
                            type: {},
                          }
                          : {
                            name: {},
                            type: { data: itemType },
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
