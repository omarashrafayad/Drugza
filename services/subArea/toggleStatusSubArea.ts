import AxiosInstance from "@/lib/AxiosInstance";
import {useState} from "react";

function useToggleStatusSubArea() {
    const [loading, setLoading] = useState(false);

    // Function to toggle the status of a sub-area
    const toggleStatusSubArea = async (subAreaId: string) : Promise<{success: boolean; error?: string}> => {
        setLoading(true);
        try {
            const response = await AxiosInstance.put(`/api/SubAreas/${subAreaId}/ChangeStatus`);
            if (response.status !== 204) {
                throw new Error('Failed to toggle sub-area status');
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
        toggleStatusSubArea
    };
}

export default useToggleStatusSubArea;