"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2, Layers } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MainCategory } from "@/types/mainCategory";
import { useDeleteMainCategory } from "@/services/MainCategories";
import Image from "next/image";

interface BaseColumnsProps {
  refresh: () => void;
  onViewCategories: (category: MainCategory) => void;
  t: (key: string) => string;
}

export const baseColumns = ({
  refresh,
  onViewCategories,
  t,
}: BaseColumnsProps): ColumnDef<MainCategory>[] => [
  {
    accessorKey: "image",
    header: t("image") || "Image",
    cell: ({ row }) => {
      const item = row.original;
      const imageUrl =
        item.imageName ||
        (item as any).imagePath ||
        item.imageUrl ||
        (item as any).image;

      return (
        <div className="relative w-12 h-12 overflow-hidden rounded-md border border-default-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.name || "Main Category"}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-default-100 flex items-center justify-center text-[10px] text-default-400">
              No Img
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: t("name"),
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.getValue("name") || "-"}
      </span>
    ),
  },
  {
    accessorKey: "arabicName",
    header: t("arabicName"),
    cell: ({ row }) => <span>{row.getValue("arabicName") || "-"}</span>,
  },
  {
    accessorKey: "description",
    header: t("description"),
    cell: ({ row }) => {
      const desc = row.getValue("description") as string;
      return (
        <span className="text-muted-foreground text-sm line-clamp-2 max-w-md">
          {desc || "-"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: t("actions"),
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      const { deleteMainCategory, loading: deleting } = useDeleteMainCategory();

      const handleDelete = () => {
        const toastId = toast(t("deleteConfirmTitle"), {
          description: t("deleteConfirmDesc"),
          action: (
            <div className="flex justify-end mx-auto items-center my-auto gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.dismiss(toastId)}
                className="px-3 py-1 rounded-md"
              >
                {t("cancel")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={deleting}
                className="px-3 py-1 rounded-md text-white bg-red-600 border-red-600 hover:bg-red-700"
                onClick={async () => {
                  try {
                    const result = await deleteMainCategory(item.id);
                    toast.dismiss(toastId);

                    if (result.success) {
                      toast.success(t("deletedSuccess"));
                      refresh();
                    } else {
                      toast.error(result.error || t("deleteError"));
                    }
                  } catch (error: any) {
                    toast.dismiss(toastId);
                    toast.error(error?.message || t("deleteError"));
                  }
                }}
              >
                {t("confirm")}
              </Button>
            </div>
          ),
        });
      };

      return (
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onViewCategories(item)}
            className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10 rounded-full"
            title={t("viewSubCategories")}
          >
            <Layers className="w-4 h-4" />
          </Button>

          <Link
            href={`/dashboard/edit-main-category/${item.id}`}
            className="flex items-center justify-center h-8 w-8 text-info hover:text-info hover:bg-info/10 rounded-full transition-colors"
            title={t("editMainCategory")}
          >
            <SquarePen className="w-4 h-4" />
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={deleting}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
            title={t("deleteConfirmTitle")}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
