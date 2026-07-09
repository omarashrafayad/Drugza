import AxiosInstance from "@/lib/AxiosInstance";
import {useState} from "react";
import {MainArea, SubArea} from '@/types/areas';

interface UpdateMainAreaResponse {
    success: boolean;
    data?: MainArea;
    error?: string;
}

function useUpdateMainArea() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateMainArea = async (
        areaId: string, 
        areaData: any,
    ): Promise<UpdateMainAreaResponse> => {
        try {
            setLoading(true);
            setError(null);

            const response = await AxiosInstance.put<MainArea>(`/api/Regions/${areaId}`, areaData);
            
            if (response.status !== 204) {
                throw new Error('Failed to update main area');
            }

            return {
                success: true,
                data: response.data
            };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update main area';
            setError(errorMessage);
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
        error,
        updateMainArea
    };
}

export default useUpdateMainArea;