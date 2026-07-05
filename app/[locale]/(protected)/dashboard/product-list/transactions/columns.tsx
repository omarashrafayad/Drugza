import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2, Eye, Image as ImageIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ProductType } from "@/types/product";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import useDeleteProductById from "@/services/products/deleteProductById";

const ActionCell = ({
  row,
  refresh,
  t,
  userRole,
}: {
  row: { original: ProductType };
  refresh: () => void;
  t: (key: string) => string;
  userRole: string | undefined;
}) => {
  const isAdmin = userRole === "Admin";
  const isPreparationRepresentative = userRole === "Preparation representative";
  const isInventory = userRole?.toLowerCase() === "inventory";
  const { loading, deleteProductById } = useDeleteProductById();
  console.log(row.original.name)
  console.log("omar");

  const handleDelete = (id: string) => {
    const toastId = toast(t("warning"), {
      description: t("delete_product_confirmation"),
      action: (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.dismiss(toastId)}
          >
            {t("cancel")}
          </Button>
          <Button
            size="sm"
            className="bg-red-600 text-white"
            disabled={loading}
            onClick={async () => {
              toast.dismiss(toastId);
              const { success } = await deleteProductById(id);
              if (success) {
                toast.success(t("delete_product_success"));
                refresh();
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
    <div className="flex items-center gap-2">
      {/* زر العرض - View Details */}
      {/* {isAdmin && ( */}
        <Link
          href={`/dashboard/product-list/${row.original.id}`}
          className="p-2 text-primary bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all"
          title={t("view")}
        >
          <Eye className="w-4 h-4" />
        </Link>
      {/* )} */}

      {/* زر التعديل - Edit */}
      {/* {(isAdmin || isInventory || isPreparationRepresentative) && ( */}
        <Link
          href={`/dashboard/edit-product/${row.original.id}`}
          className="p-2 text-info bg-info/10 rounded-full hover:bg-info hover:text-white transition-all"
          title={t("edit")}
        >
          <SquarePen className="w-4 h-4" />
        </Link>
      {/* )} */}

      {/* زر الحذف - Delete */}
      {/* {isAdmin && ( */}
        <button
          onClick={() => row.original.id && handleDelete(row.original.id)}
          className="p-2 text-destructive bg-destructive/10 rounded-full hover:bg-destructive hover:text-white transition-all"
          title={t("delete")}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      {/* )} */}
    </div>
  );
};

export const baseColumns = ({
  refresh,
  t,
  locale,
}: {
  refresh: () => void;
  t: (key: string) => string;
  locale: string;
}): ColumnDef<ProductType>[] => {
  const userRole = Cookies.get("userRole");
  const isArabic = locale === "ar";

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "images",
      header: t("image"),
      cell: ({ row }) => {
        const hasImage = !!row.original.imageUrl;
        return (
          <div className="w-12 h-12 rounded-md overflow-hidden border border-default-200 flex items-center justify-center bg-slate-50">
            {hasImage ? (
              <img 
                src={row.original.imageUrl} 
                alt={row.original.name || (isArabic ? row.original.productArabicName : row.original.productName)} 
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="w-6 h-6 text-slate-300" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: t("name"),
      cell: ({ row }) => {
        return (
          <span className="text-sm font-medium">{row.original.name || t("unknown")}</span>
        );
      },
    },
    {
      accessorKey: "description",
      header: t("Description"),
      cell: ({ row }) => (
        <span className="text-sm">{row.original.description}</span>
      ),
    },
    {
      accessorKey: "price",
      header:t("Price"),
      cell: ({ row }) => (
        <span className="text-sm">
       {row.original.price}
        </span>
      ),
    },
          {
      accessorKey: "sku",
      header:t("sku"),
      cell: ({ row }) => (
        <span className="text-sm">
       {row.original.sku ? row.original.sku : "unknown"}
        </span>
      ),
    },
    {
      accessorKey: "subCategoryName",
      header: t("subCategoryName"),
      cell: ({ row }) => {
        return (
          <span className="text-sm">{row.original.subCategoryName || t("unknown")}</span>
        );
      },
    },
    {
      accessorKey: "brandName",
      header: t("brandName"),
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.brandName || t("unknown")}
        </span>
      ),
    },
    // {
    //   accessorKey: "revenuePercentage",
    //   header: t("revenuePercentage"),
    //   cell: ({ row }) => (
    //     <span className="text-sm">
    //       {row.original.revenuePercentage !== undefined && row.original.revenuePercentage !== null
    //         ? `${row.original.revenuePercentage}%`
    //         : "-"}
    //     </span>
    //   ),
    // },
    // {
    //   accessorKey: "isPopular",
    //   header: isArabic ? "شائع" : "Popular",
    //   cell: ({ row }) => (
    //     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.original.isPopular ? "bg-success/20 text-success" : "bg-red-500 text-white"}`}>
    //       {row.original.isPopular ? t("yes") : t("no")}
    //     </span>
    //   ),
    // },
  ];

  // if (userRole === "Admin" || userRole?.toLowerCase() === "inventory" || userRole === "Preparation representative") {
    columns.push({
      id: "actions",
      header: t("Actions"),
      cell: ({ row }) => (
        <ActionCell row={row} refresh={refresh} t={t} userRole={userRole} />
      ),
    });
  // }

  return columns;
};