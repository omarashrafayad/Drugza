import AxiosInstance from "@/lib/AxiosInstance";
import {useState} from "react";
import {SubArea} from "@/types/areas";

function GettingActiveSubAreas() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSubAreas, setActiveSubAreas] = useState<SubArea[]>([]);

    const getActiveSubAreas = async () => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get('/api/SubAreas/GetAllActive').then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch active sub-areas');
            }
            setActiveSubAreas(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        });
    }

    return { activeSubAreas, loading, error, getActiveSubAreas };
}

export default GettingActiveSubAreas;