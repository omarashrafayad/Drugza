import {useState} from "react";
import {MainArea} from "@/types/areas";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingMainAreaById() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mainArea, setMainArea] = useState<MainArea | null>(null);

    const getMainAreaById = async (id: string | string[] | undefined) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/Regions/${id}`).then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch main area');
            }
            setMainArea(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return { mainArea, loading, error, getMainAreaById };
}

export default useGettingMainAreaById;