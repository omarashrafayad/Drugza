import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useUpdateProductById() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updatingProductById = async (
        id: string | string[] | undefined,
        updatedData: any
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        setError(null);

        try {
            const response = await AxiosInstance.put(`/api/Products/${id}`, updatedData);

            if (![200, 201, 204].includes(response.status)) {
                throw new Error("Failed to update product");
            }

            return { success: true };
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || "Unknown error";
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    };

    return { updatingProductById, loading, error };
}

export default useUpdateProductById;
