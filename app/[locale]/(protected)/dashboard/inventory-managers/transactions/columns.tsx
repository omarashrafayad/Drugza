import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import useDeleteUser from "@/services/users/DeleteUser";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const AddressCell = ({ addresses, t }: { addresses: any; t: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const addressList = Array.isArray(addresses) 
    ? addresses.map((addr: any) => addr?.addressLine).filter(Boolean)
    : addresses?.addressLine ? [addresses.addressLine] : [];

  if (addressList.length === 0 || addressList[0] === "N/A") {
    return <span className="text-default-400 text-sm">N/A</span>;
  }

  const hasMultiple = addressList.length > 1;
  const visibleAddresses = isExpanded ? addressList : [addressList[0]];

  return (
    <div className="flex flex-col py-1 min-w-[250px] max-w-[400px] gap-1">
      {visibleAddresses.map((addr, index) => (
        <div 
          key={index} 
          dir="auto"
          className="text-[13px] text-default-600 leading-relaxed border-b border-dashed border-default-200 last:border-0 pb-1.5 mb-1 last:mb-0 last:pb-0 font-sans tracking-wide text-start"
        >
          {addr}
        </div>
      ))}
      
      {hasMultiple && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-[11px] font-bold text-blue-500 hover:text-blue-700 w-fit mt-1 underline-offset-4 hover:underline transition-all text-start"
        >
          {isExpanded 
            ? (t("showLess") || "Show Less") 
            : `+ ${addressList.length - 1} ${t("moreAddresses") || "More Addresses"}`}
        </button>
      )}
    </div>
  );
};

export type DataProps = {
  id: string | number;
  userName: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  isPharmacy: boolean;
  regionName: string;
  action: React.ReactNode;
  addresses: { id: string; userId: string; addressLine: string } | { id: string; userId: string; addressLine: string }[];
  fullName: string;
};

export const baseColumns = ({ refresh }: { refresh: () => void }): ColumnDef<DataProps>[] => {
  const t = useTranslations();
  
  return [
    {
      accessorKey: "fullName",
      header: "Full Name",
      cell: ({ row }) => {
        const user = row.original.fullName;
        return <div className="text-sm text-default-600">{user}</div>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.original.email;
        return <div className="text-sm text-default-600">{email}</div>;
      },
    },
    {
      accessorKey: "phoneNumber",
      header: t("phoneNumber"),
      cell: ({ row }) => {
        return <span className="text-sm text-default-600">{row.original.phoneNumber || "N/A"}</span>;
      },
    },
    {
      accessorKey: "addresses",
      header: "Addresses",
      cell: ({ row }) => {
        return <AddressCell addresses={row.original.addresses} t={t} />;
      },
    },
  ];
};