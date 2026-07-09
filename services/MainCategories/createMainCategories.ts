import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useCreateMainCategories() {
    const [loading, setLoading] = useState(false);

    const createMainCategory = async (categoryData: any): Promise<{success: boolean; error?: string}> => {
        setLoading(true);

        try {
            const response = await AxiosInstance.post("/api/MainCategories", categoryData);
            if (response.status !== 201) {
                return { success: false, error: "Failed to create main category" };
            }
            return { success: true };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to create main category';
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }

    return {
        createMainCategory,
        loading,
    };
}

export default useCreateMainCategories;