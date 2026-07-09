import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import {ModuleType} from "@/types/module";

export interface UpdateMainCategoryResponse {
    success: boolean;
    data?: ModuleType;
    error?: string;
}

function useUpdateMainCategory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateMainCategory = async (
        categoryId: string,
        categoryData: Omit<ModuleType, 'id'>,
    ): Promise<UpdateMainCategoryResponse> => {
        try {
            setLoading(true);
            setError(null);

            const response = await AxiosInstance.put<ModuleType>(`/api/MainCategories/${categoryId}`, categoryData);

            if (response.status !== 204) {
                throw new Error('Failed to update main category');
            }

            return {
                success: true,
                data: response.data
            };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update main category';
            setError(errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        } finally {
            setLoading(false);
        }
    }

    return {
        updateMainCategory,
        loading,
        error,
    };
}

export default useUpdateMainCategory;