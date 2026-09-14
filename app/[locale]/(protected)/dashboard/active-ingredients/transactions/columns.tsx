"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2, Pencil, FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ActiveIngredient } from "@/types/activeIngredient";
import { useDeleteActiveIngredient } from "@/services/ActiveIngerients";

interface ColumnsProps {
  refresh: () => void;
  onEdit: (item: ActiveIngredient) => void;
  t: (key: string) => string;
}

export const baseColumns = ({
  refresh,
  onEdit,
  t,
}: ColumnsProps): ColumnDef<ActiveIngredient>[] => [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => (
      <span className="text-xs font-semibold text-muted-foreground px-2">
        {row.index + 1}
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: t("ingredientName") || "Ingredient Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <FlaskConical className="h-4 w-4" />
          </div>
          <span className="font-medium text-default-900 capitalize">
            {name ? name.trim() : t("unknown") || "Unknown"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "isMeltable",
    header: t("isMeltable") || "Meltable",
    cell: ({ row }) => {
      const isMeltable = Boolean(row.original.isMeltable);
      return (
        <Badge
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[11px] whitespace-nowrap font-medium border-0",
            isMeltable
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
              : "bg-default-200 text-default-700"
          )}
        >
          {isMeltable ? (t("meltable") || "Meltable") : (t("nonMeltable") || "Non-meltable")}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: t("actions") || "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      const { deleteActiveIngredient, loading } = useDeleteActiveIngredient();

      const handleDelete = () => {
        const toastId = toast(t("delete_title") || "Delete Active Ingredient", {
          description: t("delete_confirm") || "Are you sure you want to delete this active ingredient?",
          action: (
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.dismiss(toastId)}
                className="px-3 py-1 text-xs"
              >
                {t("cancel") || "Cancel"}
              </Button>
              <Button
                size="sm"
                variant="default"
                disabled={loading}
                className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white"
                onClick={async () => {
                  try {
                    await deleteActiveIngredient(item.id);
                    toast.dismiss(toastId);
                    toast.success(t("successMessage") || "Deleted successfully");
                    refresh();
                  } catch (error: any) {
                    toast.dismiss(toastId);
                    toast.error(error.message || t("errorMessage") || "Failed to delete");
                  }
                }}
              >
                {t("confirm") || "Confirm"}
              </Button>
            </div>
          ),
        });
      };

      return (
        <div className="flex items-center gap-1.5 py-1 justify-center">
          <button
            type="button"
            onClick={() => onEdit(item)}
            className="flex items-center p-1.5 text-primary bg-primary/20 duration-200 transition-all hover:bg-primary/80 hover:text-primary-foreground rounded-full cursor-pointer"
            title={t("editIngredient") || "Edit"}
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center p-1.5 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full cursor-pointer"
            title={t("removeIngredient") || "Delete"}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      );
    },
  },
];
