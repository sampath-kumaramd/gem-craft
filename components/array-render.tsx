import { InitialItemType, CreateItemType } from "@/hooks/items";
import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Trash2 } from "lucide-react";

interface ArrayRendererProps {
  values: CreateItemType[] | CreateItemType[]; // Assuming your array contains numbers, change the type if needed
  onRemove: (index: number) => void;
}

const ArrayRenderer: React.FC<ArrayRendererProps> = ({ values, onRemove }) => {
  const handleRemove = (index: number) => {
    onRemove(index);
  };

  return (
    <div>
      <div className="grid grid-cols-4">
        <div className="col-span-1 mt-5 "></div>
        <div className="col-span-3 mt-5">
          {values.map((value, index) => (
            <>
              <div className="mb-2 grid grid-cols-7 border-2">
                <div className="col-span-4 ml-2 mt-2">Name : {value.name}</div>
                <div className="mr-2" onClick={() => handleRemove(index)}>
                  {" "}
                  <Trash className="mr-2 mt-2 h-4 w-4 hover:cursor-pointer" />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrayRenderer;
