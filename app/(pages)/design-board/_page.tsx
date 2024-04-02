"use client"

import Image from "next/image";
import styles from "./page.module.css";
import DndExample from "@/components/DndExample";
import { useEffect, useState } from "react";
import { getAllItems } from "@/hooks/items";
import { useQuery } from "@tanstack/react-query";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { cardsData } from "@/bin/CardsData";
import { DndContext } from "@/context/DndContext";

export default function Home() {
  const {
    status,
    error,
    data: allItems,
  } = useQuery({
    queryKey: ["items_getAllItems"],
    queryFn: getAllItems,
  });

  if (status === "success") {
    console.log(allItems.flat());
  }
  interface DroppableValue {
    title: string;
    components: {
      id: number;
      name: string;
    }[];
  }
  interface Cards {
    id: number;
    title: string;
    components: {
        id: number;
        name: string;
    }[];
  }

  const [data, setData] = useState<Cards[] | []>([])
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
    const sourceDroppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
    const destinationDroppableIndex = newData.findIndex(x => x.id == destination.droppableId.split("droppable")[1]);
  
    // Check if the source is "Beads" or "Pendants"
    if (newData[sourceDroppableIndex].title === "Beads" || newData[sourceDroppableIndex].title === "pendants") {
      const item = { ...newData[sourceDroppableIndex].components[source.index] }; // copy the item
      newData[destinationDroppableIndex].components.splice(destination.index, 0, item);
    } else {
      const [item] = newData[sourceDroppableIndex].components.splice(source.index, 1); // move the item
      // Check if the destination is "Beads" or "Pendants"
      if (newData[destinationDroppableIndex].title !== "Beads" && newData[destinationDroppableIndex].title !== "pendants") {
        newData[destinationDroppableIndex].components.splice(destination.index, 0, item);
      }
    }
  
    setData([...newData]);
  };
  useEffect(() => {
    setData(cardsData)
  }, [])

  function renderDroppable(val: DroppableValue, index: number) {
    return (
      <Droppable key={index} droppableId={`droppable${index}`}>
        {
          (provided) => (
            <div className="p-5 lg:w-1/3 w-full bg-white  border-gray-400 border border-dashed"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2 className="text-center font-bold mb-6 text-black">{val.title}</h2>
              {
                val.components?.map((component, index) => (
                  <Draggable key={component.id} draggableId={component.id.toString()} index={index}>
                    {
                      (provided) => (
                        <div className="bg-gray-200 mx-1 px-4 py-3 my-3"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >{component.name}</div>
                      )
                    }
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    )
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <h1 className="text-center mt-8 mb-3 font-bold text-[25px] ">Drag and Drop Application</h1>
      <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
        {data.length > 0 && renderDroppable(data[0], 0)}
        {data.length > 2 && renderDroppable(data[2], 2)}
        {data.length > 1 && renderDroppable(data[1], 1)}
        {data.length > 4 && renderDroppable(data[4], 4)}
        {data.length > 3 && renderDroppable(data[3], 3)}
        {data.length > 5 && renderDroppable(data[5], 5)}
        {data.length > 6 && renderDroppable(data[6], 6)}
      </div>
    </DndContext>
  )
};