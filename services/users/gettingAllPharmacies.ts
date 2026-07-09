import {useState} from 'react';
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingAllPharmacies() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pharmacies, setPharmacies] = useState([]);

    const gettingAllPharmacies = async () => {
        setLoading(true);
        await AxiosInstance.get(`/api/Users/by-role/E48E5A9F-2074-4DE9-A849-5C69FDD45E4E`).then((response) => {
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Network response was not ok');
            }
            setPharmacies(response.data);
        }).catch ((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        })
    };

    return {
        loading,
        error,
        pharmacies,
        gettingAllPharmacies
    }
}

export default useGettingAllPharmacies;