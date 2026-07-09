import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingAllReturns() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [returns, setReturns] = useState<any[]>([]);

    // Function to fetch all returns
    const getAllReturns = async () => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get('/api/returns/reaturns').then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch returns');
            }
            setReturns(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return { returns, loading, error, getAllReturns };
}

export default useGettingAllReturns;
