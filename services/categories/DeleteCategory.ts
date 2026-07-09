import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useDeleteCategoryById() {
    const [loading, setLoading] = useState(false);

    const deleteCategoryById = async (
        id: string | string[] | undefined
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);

        try {
            const response = await AxiosInstance.delete(`/api/Categories/${id}`);

            if (response.status === 200 || response.status === 204) {
                return { success: true };
            } else {
                return { success: false, error: "Something went wrong" };
            }
        } catch (err: any) {
            return {
                success: false,
                error: err.response?.data?.message || err.message,
            };
        } finally {
            setLoading(false);
        }
    };

    return { deleteCategoryById, loading };
}

export default useDeleteCategoryById;