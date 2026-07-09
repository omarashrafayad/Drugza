import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import {MainArea} from "@/types/areas";

function useGettingAllMainAreas() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mainAreas, setMainAreas] = useState<MainArea[]>([]);

    const getAllMainAreas = async () => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get('/api/Regions').then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch main areas');
            }
            setMainAreas(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return { mainAreas, loading, error, getAllMainAreas };
}

export default useGettingAllMainAreas;