import React from 'react';
import AxiosInstance from "@/lib/AxiosInstance";

function useDeleteMainCategory() {
    const [loading, setLoading] = React.useState(false);

    const deleteMainCategory = async (categoryId: string): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        try {
            const response = await AxiosInstance.delete(`/api/MainCategories/${categoryId}`)

            if (response.status !== 200) {
                throw new Error('Failed to delete main category');
            }

            return { success: true };
        } catch (error: any) {
            const errorMessage = error.message || 'Failed to delete main category';
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        deleteMainCategory,
        loading,
    };
}

export default useDeleteMainCategory;