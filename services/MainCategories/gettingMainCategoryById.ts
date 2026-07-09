import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import {ModuleType} from "@/types/module";

function useGettingMainCategoryById() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mainCategory, setMainCategory] = useState<ModuleType | null>(null);

    const getMainCategory = async (id: string | string[] | undefined) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/MainCategories/${id}?lang=3`)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Failed to fetch main categories');
                }
                setMainCategory(response.data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { mainCategory, loading, error, getMainCategory };
}

export default useGettingMainCategoryById;