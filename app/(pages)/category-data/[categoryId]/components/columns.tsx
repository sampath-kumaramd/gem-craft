"use client";

// import { Decimal } from "@prisma/client/runtime";
import { ColumnDef } from "@tanstack/react-table";

export type CostingColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<CostingColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
