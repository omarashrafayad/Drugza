import { ColumnDef } from "@tanstack/react-table";
import { formatDateToDMY } from "@/utils";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import Cookies from "js-cookie";

export const basecolumns = ({ t }: { t: (key: string) => string }): ColumnDef<any>[] => [
 
  {
    accessorKey: "pharmacyName",
    header: "Pharmacy Name",
    cell: ({ row }) => {
     return <span>{row.original.pharmacyName}</span>;
    },
  },
  {
    accessorKey: "Provider Name",
    header:"Provider Name",
    cell: ({ row }) => {
      return <span>{row.original.inventoryUser.bussinesName}</span>;
    },
  },
  {
    accessorKey: "requestDate",
    header: t("returnDate"),
    cell: ({ row }) => {
      return <span>{formatDateToDMY(row.original.requestDate)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: t("status"),
    cell: ({ row }) => {

      const statusValue = row.original.status ?? 0;

      
      let statusText = "requested";
      let statusStyles = "bg-yellow-100 text-yellow-700";

      if (statusValue === 4) {
        statusText = "completed";
        statusStyles = "bg-emerald-100 text-emerald-700";
      } else if (statusValue === 0) {
        statusText = "requested";
        statusStyles = "bg-yellow-100 text-yellow-700";
      }

      else if (statusValue === 1) {
        statusText = "approved";
        statusStyles = "bg-blue-100 text-blue-700";
        
      } else if (statusValue === 2) {
        statusText = "rejected";
        statusStyles = "bg-red-100 text-red-700";
      
      } else if (statusValue === 3) {
        statusText = "processing";
        statusStyles = "bg-red-100 text-red-700";
      
      } else if (statusValue === 10) {
        statusText = "partially refund";
        statusStyles = "bg-red-100 text-red-700";
      }

      return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles}`}>
          {statusText}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: t("actions"),
    cell: ({ row }) => {
      const router = useRouter();

      const handleViewDetails = () => {
        const returnId = row.original.id;
        const userRole = Cookies.get("userRole");

        const targetPath = `/dashboard/return-details/${returnId}`;

        router.push(targetPath);
      };

      return (
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8"
          onClick={handleViewDetails}
          title={t("viewDetails")}
        >
          <Icon icon="heroicons:eye" className="h-4 w-4" />
        </Button>
      );
    },
  },
];