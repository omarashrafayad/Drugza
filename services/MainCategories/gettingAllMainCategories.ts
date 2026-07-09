import AxiosInstance from "@/lib/AxiosInstance";
import {useState} from "react";

function useGettingAllMainCategories() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mainCategories, setMainCategories] = useState<any[]>([]);

    const getAllMainCategories = async () => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get('/api/MainCategories?lang=3').then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch main categories');
            }
            setMainCategories(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return { mainCategories, loading, error, getAllMainCategories };
}

export default useGettingAllMainCategories;