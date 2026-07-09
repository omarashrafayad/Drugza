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
import { basecolumns } from "./columns";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TablePagination from "./table-pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGettingAllReturns from "@/services/returns/gettingAllReturns";
import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import useVendorReturns from "@/services/returns/VendorReturns";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

const TransactionsTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const userType = Cookies.get("userRole");
  const isInventoryUser = userType === "Inventory";

  
  const {loading: loadingReturns, error: error, returns, getAllReturns} = useGettingAllReturns();
  const {loading: loadingVendorReturns, error: vendorError, returns: vendorReturns, gettingVendorReturns} = useVendorReturns();

  
  const [filteredData, setFilteredData] = React.useState<any[]>([]);

  
  const allReturnsData = isInventoryUser ? vendorReturns : returns;
  const isLoadingData = isInventoryUser ? loadingVendorReturns : loadingReturns;

  
  const filteringReturns = (filter: string) => {
    if (!allReturnsData) return;

    if (filter === "all") {
      setFilteredData(allReturnsData);
    } else {
      const newData = allReturnsData.filter((item) => item.status === filter);
      setFilteredData(newData);
    }
  };

  const t = useTranslations("ReturnList")

  const columns = basecolumns({t}); 

  const table = useReactTable({
    data: filteredData || [],
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
    if (isInventoryUser) {
      gettingVendorReturns();
    } else {
      getAllReturns();
    }
  }, [isInventoryUser]);

  
  useEffect(() => {
    if (allReturnsData) {
      setFilteredData(allReturnsData);
    }
  }, [allReturnsData]);

  return (
      <>
        {isLoadingData ? (
            <div className="flex items-center justify-center h-screen">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
        ) : (
            <Card className="w-full">
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
        )}
      </>
  );
};
export default TransactionsTable;