import {useState} from "react";
import {MainArea} from "@/types/areas";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingActiveAreas() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeAreas, setActiveAreas] = useState<MainArea[]>([]);

    const getActiveAreas = async () => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get('/api/Regions/GetAllActive').then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch active areas');
            }
            setActiveAreas(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return { activeAreas, loading, error, getActiveAreas };
}

export default useGettingActiveAreas;