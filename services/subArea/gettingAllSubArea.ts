import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingAllSubArea() {
   const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allSubArea, setAllSubArea] = useState([]);

    const getAllSubArea = async () => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get('/api/SubAreas').then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch sub-area');
            }
            setAllSubArea(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }
    return { allSubArea, loading, error, getAllSubArea };
}

export default useGettingAllSubArea;