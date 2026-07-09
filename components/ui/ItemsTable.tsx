import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderItem } from "@/types/orders";
import { useTranslations } from "next-intl";

interface Props {
    items: OrderItem[];
    deletedItems: string[];
    onDeleteItem: (id: string, productName: string) => void;
    onSelectionChange?: (ids: string[]) => void; // NEW
}

const ItemsTable = ({ items, deletedItems, onDeleteItem, onSelectionChange }: Props) => {
    const t = useTranslations("removeItem");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelection = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        onSelectionChange?.(selectedIds);
    }, [selectedIds]);

    return (
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
            <tr>
                <th className="p-2"><Checkbox disabled /></th>
                <th className="p-2">{t("Product")}</th>
                <th className="p-2">{t("inventoryManager")}</th>
                <th className="p-2">{t("Actions")}</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) => (
                <tr key={item.productId} className="border-t">
                    <td className="p-2">
                        <Checkbox
                            checked={selectedIds.includes(item.id as string)}
                            onCheckedChange={() => toggleSelection(item.id as string)}
                        />
                    </td>
                    <td className="p-2">{item.productName}</td>
                    <td className="p-2">{item.inventoryName || "N/A"}</td>
                    <td className="p-2">
                        <button onClick={() => onDeleteItem(item.id as string, item.productName)}>
                            <Trash2 className="text-red-500 hover:text-red-700 w-4 h-4" />
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ItemsTable;