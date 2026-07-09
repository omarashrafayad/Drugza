import AxiosInstance from "@/lib/AxiosInstance";
import {useState} from "react";
import {SubArea} from "@/types/areas";

function useCreateSubArea() {
    const [loading, setLoading] = useState(false);

    // Function to create a sub-area
    const createSubArea = async (subAreaData: SubArea) : Promise<{success: boolean; error?: string}> => {
        setLoading(true);
        try {
            const response = await AxiosInstance.post('/api/SubAreas', subAreaData);
            if (response.status !== 201) {
                throw new Error('Failed to create sub-area');
            }
            return { success: true };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
        } finally {
            setLoading(false);
        }
    };
    return { createSubArea, loading };
}

export default useCreateSubArea
