"use client"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Card from './card'
import { useQuery } from '@tanstack/react-query';
import { getAllItems } from '@/hooks/items';

export default function ParentComponent() {

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

  return (
    // <DndProvider backend={HTML5Backend}>
    //   <Card isDragging={false} text="Example text" />
    // </DndProvider>
    <div>hi</div>
  )
}