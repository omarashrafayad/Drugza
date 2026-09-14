"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { baseColumns } from "./columns";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Loader2, Plus } from "lucide-react";
import { ActiveIngredient } from "@/types/activeIngredient";
import { useGettingAllActiveIngredients } from "@/services/ActiveIngerients";
import { AddActiveIngredientDialog } from "./add-active-ingredient-dialog";
import { useTranslations } from "next-intl";
import { useDebounce } from "use-debounce";

const PAGE_SIZE = 10;

export default function TransactionsTable() {
  const t = useTranslations("activeIngredients");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Search state with debounce for backend search
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<ActiveIngredient | null>(null);

  const {
    loading,
    activeIngredients: data,
    totalItems,
    totalPages: apiTotalPages,
    pageNumber: currentPage,
    getAllActiveIngredients,
    refreshActiveIngredients,
  } = useGettingAllActiveIngredients();

  const handleRefresh = useCallback(() => {
    refreshActiveIngredients();
  }, [refreshActiveIngredients]);

  // Backend search: trigger on debounced search change and reset to page 1
  useEffect(() => {
    getAllActiveIngredients(1, PAGE_SIZE, debouncedSearchTerm);
  }, [debouncedSearchTerm, getAllActiveIngredients]);

  const handleEdit = (item: ActiveIngredient) => {
    setSelectedIngredient(item);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedIngredient(null);
    setDialogOpen(true);
  };

  const columns = useMemo(
    () =>
      baseColumns({
        refresh: handleRefresh,
        onEdit: handleEdit,
        t,
        pageNumber: currentPage,
        pageSize: PAGE_SIZE,
      }),
    [handleRefresh, handleEdit, t, currentPage]
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: apiTotalPages,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: PAGE_SIZE,
      },
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex: currentPage - 1, pageSize: PAGE_SIZE })
          : updater;

      getAllActiveIngredients(
        newPagination.pageIndex + 1,
        PAGE_SIZE,
        debouncedSearchTerm
      );
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <Card className="w-full">
      <div className="px-5 py-4 flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-auto flex-1">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("searchPlaceholder") || "Search active ingredients..."}
            className="w-full max-w-xl"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-end">
          <Button
            size="md"
            variant="default"
            className="gap-2 cursor-pointer font-normal rounded-md"
            onClick={handleAdd}
          >
            <Plus className="w-4 h-4" />
            {t("addIngredient") || "Add Active Ingredient"}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-full py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <CardContent>
          <div className="border border-solid border-default-200 rounded-lg overflow-hidden border-t-0">
            <Table>
              <TableHeader className="bg-default-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead className="last:text-start" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
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
                      className="h-24 text-center font-medium"
                    >
                      {t("noIngredientsFound") || "No active ingredients found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}

      <TablePagination table={table} />

      <AddActiveIngredientDialog
        open={dialogOpen}
        onOpenChange={(val) => {
          setDialogOpen(val);
          if (!val) setSelectedIngredient(null);
        }}
        editData={selectedIngredient}
        onSuccess={handleRefresh}
      />
    </Card>
  );
}
