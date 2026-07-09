import {useState} from "react";
import {SubArea} from "@/types/areas";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingSubAreaById() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [subArea, setSubArea] = useState<SubArea | null>(null);

    const getSubAreaById = async (id: string | string[] | undefined) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/SubAreas/${id}`).then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch sub-area');
            }
            setSubArea(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }
    return { subArea, loading, error, getSubAreaById };
}

export default useGettingSubAreaById;