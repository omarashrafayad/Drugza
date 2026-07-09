import AxiosInstance from "@/lib/AxiosInstance";
import {useState} from "react";
import {SubArea} from "@/types/areas";

interface UpdateSubAreaResponse {
    success: boolean;
    data?: SubArea;
    error?: string;
}

function useUpdateSubArea() {
    const [loading, setLoading] = useState(false);

    // Function to update the sub-area
    const updateSubArea = async (subAreaId: string, subAreaData: any): Promise<UpdateSubAreaResponse> => {
        try {
            setLoading(true);
            const response = await AxiosInstance.put<SubArea>(`/api/SubAreas/${subAreaId}`, subAreaData);
            if (response.status !== 204) {
                throw new Error('Failed to update sub-area');
            }
            return {
                success: true,
                data: response.data
            };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update sub-area';
            return {
                success: false,
                error: errorMessage
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        updateSubArea
    };
}

export default useUpdateSubArea;