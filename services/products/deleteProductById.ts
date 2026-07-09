import React from 'react';
import AxiosInstance from "@/lib/AxiosInstance";

function useDeleteProductById() {

    const [loading, setLoading] = React.useState(false);

    const deleteProductById = async (id: string | undefined): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        try {
            const response = await AxiosInstance.delete(`/api/Products/${id}`);
            if ([200, 204].includes(response.status)) {
                return { success: true };
            } else {
                return { success: false, error: "Failed to delete product" };
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

    return { deleteProductById, loading };
}

export default useDeleteProductById;