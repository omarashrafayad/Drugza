"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from '@/i18n/routing';
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CategoryType } from "@/types/category";
import useDeleteCategoryById from "@/services/categories/DeleteCategory";
import Image from "next/image";

export const baseColumns = ({ refresh, t }: { refresh: () => void, t: (key: string) => string; }): ColumnDef<CategoryType>[] => [
  {
    accessorKey: "name",
    header: t("category_name"),
    cell: ({ row }) => <span>{row.getValue("name") || t("unknown")}</span>,
  },
  {
    accessorKey: "categoryImageUrl",
    header: t("Image"),
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl;
      return (
        <div className="relative w-12 h-12 overflow-hidden rounded-md border border-default-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Category"
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
    id: "actions",
    accessorKey: "action",
    header: t("actions"),
    enableHiding: false,
    cell: ({ row }) => {
      const id: string | number | undefined = row.original.id;
      const pathname = usePathname();
      const { deleteCategoryById, loading } = useDeleteCategoryById();

      const getHref = () => {
        if (pathname?.includes("/categories")) {
          return "/dashboard/edit-category";
        } else {
          return "/dashboard/edit-category";
        }
      };

      const handleDelete = () => {
        const toastId = toast(t("delete_category"), {
          description: t("delete_category_confirm"),
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
                disabled={loading}
                className="px-3 py-1 rounded-md text-white bg-red-600 border-red-600 hover:bg-red-700"
                onClick={async () => {
                  try {
                    const { success, error } = await deleteCategoryById(id as string);
                    toast.dismiss(toastId);

                    if (success) {
                      toast.success(t("category_deleted"), {
                        description: t("category_deleted_success"),
                      });
                      refresh();
                    } else {
                      throw new Error(error);
                    }
                  } catch (error) {
                    toast.dismiss(toastId);
                    toast.error(t("error"), {
                      description: (error as Error).message,
                    });
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
        <div className="flex items-center gap-1">
          <Link
            href={`${getHref()}/${id}`}
            className="flex items-center p-2 border-b text-info hover:text-info-foreground bg-info/40 hover:bg-info duration-200 transition-all rounded-full cursor-pointer"
          >
            <SquarePen className="w-4 h-4" />
          </Link>
          <div
            onClick={handleDelete}
            className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </div>
        </div>
      );
    },
  },
];
