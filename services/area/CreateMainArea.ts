import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import {MainArea} from "@/types/areas";

function useCreateMainArea() {
    const [loading, setLoading] = useState(false);

    const createMainArea = async (areaData: MainArea): Promise<{success: boolean, error?: string}> => {
        setLoading(true);

        try {
            const response = await AxiosInstance.post('/api/Regions', areaData);
            if (response.status !== 201) {
                throw new Error('Failed to create main area');
            }
            return { success: true };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to create main area';
            return { success: false, error: errorMessage };
        }
        finally {
            setLoading(false);
        }
    };

    return ({
        createMainArea,
        loading,
    })
}

export default useCreateMainArea;