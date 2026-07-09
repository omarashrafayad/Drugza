"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from '@/i18n/routing';
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {CategoryType} from "@/types/category";
import useDeleteCategoryById from "@/services/categories/DeleteCategory";
import getCategories from "@/services/categories/getCategories";
import {ModuleType} from "@/types/module";

export const baseColumns = ({t} : {
  t: (key: string) => string;
}) : ColumnDef<ModuleType>[] => [
  {
    accessorKey: "name",
    header: t("moduleName"),
    cell: ({ row }) => <span>{row.getValue("name") || t("unknown")}</span>,
  },
    {
    accessorKey: "arabicName",
    header: t("arabicName"),
    cell: ({ row }) => <span>{row.getValue("arabicName") || t("unknown")}</span>,
  },
  {
    accessorKey: "description",
    header: t("moduleDescription"),
    cell: ({ row }) => {
      return <span>{row.getValue("description")}</span>;
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

        const getHref = () => {
            if (pathname?.includes("/modules")) {
                return "/dashboard/edit-module";
            } else {
                return "/dashboard/edit-module";
            }
        };

        const handleDelete = () => {
            const toastId = toast("Delete Category", {
                description: "Are you sure you want to delete this category?",
                action: (
                    <div className="flex justify-end mx-auto items-center my-auto gap-2">
                        <Button
                            size="sm"
                            onClick={() => toast.dismiss(toastId)}
                            className="text-white px-3 py-1 rounded-md"
                        >
                            {t("cancel")}
                        </Button>
                        <Button
                            size="sm"
                            variant="shadow"
                            className="text-white px-3 py-1 rounded-md"
                            onClick={async () => {
                                try {
                                   const success = true;
                                    toast.dismiss(toastId);

                                    if (success) {
                                        toast("module deleted", {
                                            description: "The module was deleted successfully.",
                                        });
                                        
                                    }
                                } catch (error) {
                                    toast.dismiss(toastId);
                                    toast("Error", {
                                        description: (error as Error).message,
                                    });
                                }
                            }}
                        >
                            {t("remove")}
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
                {/*<div*/}
                {/*    onClick={handleDelete}*/}
                {/*    className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full cursor-pointer"*/}
                {/*>*/}
                {/*    <Trash2 className="w-4 h-4" />*/}
                {/*</div>*/}
            </div>
        );
    },
  },
];
