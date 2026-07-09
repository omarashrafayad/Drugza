import AxiosInstance from "@/lib/AxiosInstance";
import { useState } from "react";

function GettingReturnById() {
    const [loading, setLoading] = useState(true);
    const [returnData, setReturnData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const getReturnById = async (id: string | string[] | undefined) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/returns/${id}`).then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch return data');
            }
            setReturnData(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return { returnData, loading, error, getReturnById };
}

export default GettingReturnById;