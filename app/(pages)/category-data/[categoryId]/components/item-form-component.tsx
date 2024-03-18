"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {  PlusCircle } from "lucide-react";
import { CreateItemType } from "@/hooks/items";
import { FormModal } from "@/components/form-modal";
import { Separator } from "@/components/ui/separator";
interface CostingDataFormProps {
  initialItemsData: CreateItemType[] | undefined;
  categoryId: string;
  itemsData: CreateItemType[];
  setItemsData: Function;
  initialItemsDataArray: CreateItemType[];
  setInitialItemsDataArray: Function;
}

export const ItemFromComponent: React.FC<CostingDataFormProps> = ({
  initialItemsData,
  categoryId,
  setItemsData,
  itemsData,
  initialItemsDataArray,
  setInitialItemsDataArray,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialItemsData) {
      setInitialItemsDataArray(initialItemsData);
    }
  }, [initialItemsData]);
  return (
    <>
     <div className=" mt-5">  <Separator /></div>
      <div className="grid grid-cols-4">
        <div className="col-span-1 mt-5 ">Items</div>
        <div className="col-span-2 mt-5">
          <Button onClick={() => setOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
          <FormModal
            isOpen={open}
            onClose={() => setOpen(false)}
            categoryId={ categoryId}
            itemsData={initialItemsData ?  itemsData : initialItemsDataArray}
            setItemsData={
              initialItemsData ?   setItemsData : setInitialItemsDataArray
            }
          />
        </div>
      </div>
      <div className="mb-5 mt-5">  <Separator /></div>
    </>
  );
};
