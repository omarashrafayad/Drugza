import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useUpdateReturnStatus() {
    const [loading, setLoading] = useState(false);

    const updateReturnStatus = async (returnId: string, updatedData: any): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        try {
            const response = await AxiosInstance.put(`/api/returns/${returnId}/status`, updatedData);
            if (response.status !== 200) {
                throw new Error('Failed to update return status');
            }
            return { success: true };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        updateReturnStatus
    };
}

export default useUpdateReturnStatus;