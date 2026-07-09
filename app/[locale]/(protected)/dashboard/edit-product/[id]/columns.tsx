import {formatDateToDMY} from "@/utils";
import {ColumnDef} from "@tanstack/react-table";
import {Price} from "@/types/price";

export const productColumns: ColumnDef<Price>[] = [
    {
        accessorKey: "productName",
        header: "Product Name",
        cell: ({ row }) => <span>{row.getValue("productName")}</span>,
    },
    {
        accessorKey: "categoryName",
        header: "Category Name",
        cell: ({ row }) => <span>{row.getValue("categoryName")}</span>,
    },
    {
        accessorKey: "purchasePrice",
        header: "Purchase Price",
        cell: ({ row }) => <span>{row.getValue("purchasePrice")}</span>,
    },
    {
        accessorKey: "salesPrice",
        header: "Sales Price",
        cell: ({ row }) => <span>{row.getValue("salesPrice")}</span>,
    },
    {
        accessorKey: "creationDate",
        header: "Creation Date",
        cell: ({ row }) => (
            <span>{formatDateToDMY(row.getValue("creationDate"))}</span>
        ),
    },
    // {
    //     accessorKey: "inventoryUserName",
    //     header: "Inventory Username",
    //     cell: ({ row }) => <span>{row.getValue("inventoryUserName") || "N/A"}</span>,
    // },
];