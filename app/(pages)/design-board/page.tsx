"use client";
import Image from "next/image";
import styles from "./page.module.css";
import DndExample from "@/components/DndExample";
import { useEffect } from "react";
import { getAllItems } from "@/hooks/items";
import { useQuery } from "@tanstack/react-query";

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
  return (
    // <DndExample />
    <div>hi</div>
  );
}
