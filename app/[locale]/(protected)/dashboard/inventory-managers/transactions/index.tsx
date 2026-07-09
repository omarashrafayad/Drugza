"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {baseColumns} from "./columns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TablePagination from "./table-pagination";
import { Card, CardContent } from "@/components/ui/card";
import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import useGetUsersByRoleId from "@/services/users/GetUsersByRoleId";
import SearchInput from "@/app/[locale]/(protected)/components/SearchInput/SearchInput";

const TransactionsTable = () => {
  const {loading: usersLoading, users, getUsersByRoleId} = useGetUsersByRoleId()

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});


  const columns = baseColumns({ refresh: () => getUsersByRoleId("1A5A84FB-23C3-4F9B-A122-4C5BC6C5CB2D") });

  const [filteredInventoryManagers, setFilteredInventoryManagers] = useState<any[]>([]);

  const table = useReactTable({
    data: filteredInventoryManagers ?? [],
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
  });

  useEffect(() => {
    getUsersByRoleId("1A5A84FB-23C3-4F9B-A122-4C5BC6C5CB2D")
  }, []);

  useEffect(() => {
    if (users) {
      setFilteredInventoryManagers(users);
    }
  }, []);

  if ( usersLoading == true) {
    return (
        <div className="flex justify-center items-center">
          <Loader2 size={24} />
        </div>
    )
  }

  return (
      <div className={"flex flex-col"}>
        <Card className="w-full">

          <div className="px-5 py-4">
            <SearchInput
                data={users}
                setFilteredData={setFilteredInventoryManagers}
                filterKey={"userName"}
            />

          </div>

          <CardContent>
            <div className="border border-solid border-default-200 rounded-lg overflow-hidden border-t-0">
              <Table>
                <TableHeader className="bg-default-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead className="last:text-start" key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </TableHead>
                        );
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
                          <TableCell key={cell.id} className="h-[75px]">
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
          </CardContent>
          <TablePagination table={table} />
        </Card>
      </div>
  );
};
export default TransactionsTable;
