import AxiosInstance from "@/lib/AxiosInstance";
import {useState} from "react";

function useGettingAllReasons() {
    const [loading, setLoading] = useState(true);
    const [reasons, setReasons] = useState<any[]>([]);

    // Function to fetch all reasons
    const getAllReasons = async () => {
        setLoading(true);
        await AxiosInstance.get('/api/returns/reasons').then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch reasons');
            }
            setReasons(response.data);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    return {
        loading,
        reasons,
        getAllReasons
    };
}

export default useGettingAllReasons;