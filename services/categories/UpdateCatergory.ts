import { useState } from "react";
import { CategoryType } from "@/types/category";
import AxiosInstance from "@/lib/AxiosInstance";

function useUpdateCategoryById() {
    const [loading, setLoading] = useState(false);

    const updatingCategoryById = async (id: string | string[] | undefined, updatedData: CategoryType): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);

        try {
            const response = await AxiosInstance.put(`/api/Categories/${id}`, updatedData);

            if (response.status === 204 || response.status !== 500) {
                return { success: true };
            } else {
                throw new Error("Something went wrong");
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

    return { loading, updatingCategoryById };
}

export default useUpdateCategoryById;
