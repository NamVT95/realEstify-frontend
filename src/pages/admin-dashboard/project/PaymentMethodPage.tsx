import {
    CaretSortIcon,
    DotsHorizontalIcon
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useAppDispatch } from "@/hooks/useStore"
import { openUpdateForm } from "@/store/project/updateProjectSlice"
import { format, set } from "date-fns"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"

export const convertPaymentMethod = (data:any) => {
  const result = [];

  for (const paymentMethodId in data) {
    const paymentMethodData = {
      PaymentMethodId: paymentMethodId,
      details: data[paymentMethodId]
    };

    result.push(paymentMethodData);
  }

  return result;
}

export type DataType = {
  PaymentMethodId: string,
  details: any
}

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "PaymentMethodId",
    header: "Payment Method Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("PaymentMethodId")}</div>
    ),
  },
  {
    accessorKey: "details",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số đợt
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{(row.getValue("details") as any[])?.length}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const {id} = useParams()
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem><Link to={`/admin-dashboard/project/${id}/payment-method/${row.getValue("PaymentMethodId")}`}>View Payment Method</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to={`/admin-dashboard/project/${id}/payment-method/${row.getValue("PaymentMethodId")}/update`}>Edit</Link></DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function PaymentMethodPage() {
  const [data, setData] = React.useState<DataType[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const {id} = useParams()
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  React.useEffect(() => {
    axios.get(`http://localhost:4000/api/investor/payment-options/${id}`)
    .then((res) => {
      // setData(res.data)
      console.log(convertPaymentMethod(res.data?.data))
      setData(convertPaymentMethod(res.data?.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const navigate = useNavigate()

  return (
    <div className="w-full">
         <div className="my-2 flex justify-between items-center gap-2">
         <h1 className="text-2xl font-semibold">Payment Method of project {id}</h1>
          <Button onClick={() => navigate("/admin-dashboard/project/"+ id +"/payment-method/create")}>
            Add Payment Method
          </Button>
         </div>
      <div className="rounded-md border">
        
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
