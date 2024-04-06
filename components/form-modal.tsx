"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import TSForm from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {CreateItemType } from "@/hooks/items";

import { Dialog, DialogContent } from "./ui/dialog";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemsData: CreateItemType[];
  categoryId: string;
  setItemsData: Function;
}

export enum ItemType {
  BEADS,
  PENDANTS,
  DROPS,
  LINKS
}
export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  categoryId,
  itemsData,
  setItemsData,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const itemSchema = z.object({
    name: z.string().describe("Item Name // sample name"),
    categoryId: z.string().describe("Category Id // sample id"),
    material: z.array(z.string()),
    shape: z.string(),
    texture: z.string(),
    colors: z.array(z.string()),
  });

  const itemData: CreateItemType = {
    name: "",
    categoryId: "",
    type: ItemType.BEADS,
    material: [],
    natural: false,
    shape: "",
    texture: "",
    colors: [],
  };

  function handleSubmit(data: CreateItemType) {
    if (data.name === "") {
      toast.error("Please enter name");
    } else {
      itemData.name = data.name;
      itemData.price = data.price;
      itemData.categoryId = categoryId;
      setItemsData([...itemsData, itemData]);
      console.log(itemsData, "dataaa");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex w-full items-center justify-end space-x-2 pt-6">
          <TSForm
            schema={itemSchema}
            //@ts-ignore
            onSubmit={handleSubmit}
            renderAfter={() => (
              <div className="flex justify-end">
                <Button onClick={onClose} type="reset" className="mt-3">
                  Cancel
                </Button>
                <Button className="mx-2 mt-3" type="submit">
                  Add Item
                </Button>
              </div>
            )}
            renderBefore={() => <div className=""></div>}
            defaultValues={{}}
            //@ts-ignore
            props={{
              name: {
                label2: "",
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
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
