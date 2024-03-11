"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { DataTableColumnHeader } from "./data-table-column-header"
import { Booking } from "../../booking/data/schema"

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
      <DataTableColumnHeader column={column} title="BookingId" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("BookingId")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ProjectId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ProjectId" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("ProjectId")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "CustomerId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CustomerId" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            <div className="flex gap-2 items-center">
            {(row.getValue("CustomerId") as Booking["CustomerId"])} 
            </div>
          </span>
        </div>
      )
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
      )
    },
  },
  {
    accessorKey: "SelectionMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SelectionMethod" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("SelectionMethod")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
          <Badge>
            {row.getValue("Status")}
          </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]