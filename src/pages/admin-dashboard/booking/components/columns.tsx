"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Booking } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { Badge } from "@/components/ui/badge"

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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
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
            <Avatar className="h-8 w-8">
              <AvatarImage src={(row.getValue("CustomerId") as any).avatarUrl} alt={(row.getValue("CustomerId"))} />
              <AvatarFallback>{(row.getValue("CustomerId") as any).slice(0,2)}</AvatarFallback>
            </Avatar>
            {/* {(row.getValue("CustomerId") as Booking["CustomerId"])}  */}
            UserName
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