import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useRemoveItemsFromOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const removeItemsFromOrder = async (data: any): Promise<{ success: boolean, error?: string }> => {
        setLoading(true);
        setError(null);

        return await AxiosInstance.post(`/api/Orders/remove-item`, data)
            .then((response) => {
                if (response.status !== 200 && response.status !== 204) {
                    throw new Error('Failed to delete order item');
                }
                return { success: true };
            })
            .catch((error) => {
                setError(error.message);
                return { success: false, error: error.message };
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return { removeItemsFromOrder, loading, error };
}

export default useRemoveItemsFromOrder;