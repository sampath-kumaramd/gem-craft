"use client";

// import { Decimal } from "@prisma/client/runtime";
import { ColumnDef } from "@tanstack/react-table";
import { ItemCellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export type ItemColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<ItemColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "shape",
    header: "Shape",
  },
  {
    accessorKey: "texture",
    header: "Texture",
  },
  {
    accessorKey: "colors",
    header: "Colors",
  },
  {
    accessorKey: "createdAt",
    header: "created At",
    cell: ({ row }) => {
      const dateStr = row.getValue("createdAt") as string;
      const date = new Date(dateStr);
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      }).format(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    id: "actions",
    cell: ({ row }: any) => <ItemCellAction data={row.original} />,
  },
];
