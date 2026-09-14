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
import { useEffect, useState, useMemo } from "react";
import { Loader2, Plus } from "lucide-react";
import { ActiveIngredient } from "@/types/activeIngredient";
import SearchInput from "@/app/[locale]/(protected)/components/SearchInput/SearchInput";
import { useGettingAllActiveIngredients } from "@/services/ActiveIngerients";
import { AddActiveIngredientDialog } from "./add-active-ingredient-dialog";
import { useTranslations } from "next-intl";

type FilterStatus = "all" | "meltable" | "nonMeltable";

export default function TransactionsTable() {
  const t = useTranslations("activeIngredients");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [filteredIngredients, setFilteredIngredients] = useState<ActiveIngredient[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<ActiveIngredient | null>(null);

  const {
    loading,
    activeIngredients: data,
    getAllActiveIngredients,
    refreshActiveIngredients,
  } = useGettingAllActiveIngredients();

  useEffect(() => {
    // Fetch with large page size so client-side table search & pagination work smoothly just like in order-list
    getAllActiveIngredients(1, 1000, "");
  }, [getAllActiveIngredients]);

  const handleEdit = (item: ActiveIngredient) => {
    setSelectedIngredient(item);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedIngredient(null);
    setDialogOpen(true);
  };

  const filterByStatus = (status: FilterStatus, baseData = data) => {
    setSelectedStatus(status);
    if (!baseData) return;

    if (status === "all") {
      setFilteredIngredients(baseData);
    } else if (status === "meltable") {
      setFilteredIngredients(baseData.filter((item) => Boolean(item.isMeltable)));
    } else if (status === "nonMeltable") {
      setFilteredIngredients(baseData.filter((item) => !item.isMeltable));
    }
  };

  useEffect(() => {
    if (data) {
      filterByStatus(selectedStatus, data);
    }
  }, [data]);

  const columns = useMemo(
    () =>
      baseColumns({
        refresh: refreshActiveIngredients,
        onEdit: handleEdit,
        t,
      }),
    [refreshActiveIngredients, t]
  );

  const table = useReactTable({
    data: filteredIngredients ?? [],
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
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <Card className="w-full">
      <div className="px-5 py-4 flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-auto flex-1">
          <SearchInput
            data={data ?? []}
            setFilteredData={setFilteredIngredients}
            filterKey="name"
            placeholder={t("searchPlaceholder") || "Search active ingredients..."}
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
        onSuccess={refreshActiveIngredients}
      />
    </Card>
  );
}
