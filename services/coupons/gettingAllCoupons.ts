import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingAllCoupons() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [coupons, setCoupons] = useState([]);

    const getAllCoupons = async () => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/Coupons`).then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch coupons');
            }
            setCoupons(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return { coupons, loading, error, getAllCoupons };
}

export default useGettingAllCoupons;