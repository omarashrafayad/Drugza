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
import { Link } from "@/i18n/routing";
import { MainCategory } from "@/types/mainCategory";
import { useGettingAllMainCategories } from "@/services/MainCategories";
import { CategoriesDialog } from "./categories-dialog";
import { useTranslations } from "next-intl";
import { useDebounce } from "use-debounce";

const PAGE_SIZE = 10;

export default function TransactionsTable() {
  const t = useTranslations("mainCategories");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null);

  const {
    loading,
    mainCategories: data,
    totalCount,
    totalPages: apiTotalPages,
    pageNumber: currentPage,
    getAllMainCategories,
    refreshMainCategories,
  } = useGettingAllMainCategories();

  const handleRefresh = useCallback(() => {
    refreshMainCategories();
  }, [refreshMainCategories]);

  useEffect(() => {
    getAllMainCategories(1, PAGE_SIZE, undefined, debouncedSearchTerm);
  }, [debouncedSearchTerm, getAllMainCategories]);

  const handleViewCategories = (category: MainCategory) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const columns = useMemo(
    () =>
      baseColumns({
        refresh: handleRefresh,
        onViewCategories: handleViewCategories,
        t,
      }),
    [handleRefresh, t]
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

      getAllMainCategories(
        newPagination.pageIndex + 1,
        PAGE_SIZE,
        undefined,
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
      <div className="px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-solid border-default-200">
        <div className="w-full md:w-auto flex-1">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full max-w-xl"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-end">
          <Link href="/dashboard/add-main-category">
            <Button
              size="md"
              variant="default"
              className="gap-2 cursor-pointer font-normal rounded-md"
            >
              <Plus className="w-4 h-4" />
              {t("addMainCategory")}
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-full py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <CardContent className="pt-6">
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
                        <TableCell key={cell.id} className="h-[70px]">
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
                      className="h-24 text-center font-medium text-muted-foreground"
                    >
                      {t("noMainCategoriesFound")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}

      <TablePagination table={table} />

      <CategoriesDialog
        open={dialogOpen}
        onOpenChange={(val) => {
          setDialogOpen(val);
          if (!val) setSelectedCategory(null);
        }}
        mainCategory={selectedCategory}
      />
    </Card>
  );
}
