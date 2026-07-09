import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useUpdateUser() {
    const [loading, setLoading] = useState(false);


    const updateUser = async (user: any, id: string | string[] | undefined): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        try {
            const response = await AxiosInstance.put(`/api/Users/${id}`, user);
            if (response.status !== 200) {
                throw new Error('Failed to update user');
            }
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    return {updateUser, loading};
}

export default useUpdateUser;