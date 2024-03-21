"use client";

// import { Decimal } from "@prisma/client/runtime";
import { ColumnDef } from "@tanstack/react-table";
import { ItemCellAction } from "./cell-action";

export type ItemColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<ItemColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }: any) => <ItemCellAction data={row.original} />,
  },
];
