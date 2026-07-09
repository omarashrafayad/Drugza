import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useToggleAreaStatus() {
    const [loading, setLoading] = useState(false);

    const toggleAreaStatus = async (areaId: string) : Promise<{success: boolean; error?: string}> => {
        setLoading(true);
        try {
            const response = await AxiosInstance.put(`/api/Regions/${areaId}/ChangeStatus`);
            if (response.status !== 204) {
                throw new Error('Failed to toggle area status');
            }
            return { success: true }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred' }
        } finally {
            setLoading(false);
        }
    }
    return {
        loading,
        toggleAreaStatus
    };
}

export default useToggleAreaStatus;