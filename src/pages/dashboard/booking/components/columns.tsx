"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Booking } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatting";

export const columns: ColumnDef<Booking>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "BookingId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("BookingId")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ProjectId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ProjectId" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("ProjectId")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          <div className="">{(row.getValue("Customer") as any).FullName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "BookingDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking Date" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {/* format time */}
            {format(new Date(row.getValue("BookingDate")), "HH:mm dd/MM/yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "SelectionMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SelectionMethod" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("SelectionMethod")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("Status");
      return (
        <Badge
          className={`
          ${status.toLowerCase() === "approved" && "bg-green-200 text-green-500 hover:bg-green-200"} 
          ${status.toLowerCase() === "rejected" && "bg-red-200 text-red-500 hover:bg-red-200"} 
          ${status.toLowerCase() === "pending" && "bg-yellow-200 text-yellow-500 hover:bg-yellow-200"}
          `}
        >
          {row.getValue("Status")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "AmountDeposit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deposit" />
    ),
    cell: ({ row }) => {
      return <div>{formatPrice(row.getValue("AmountDeposit"))}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
