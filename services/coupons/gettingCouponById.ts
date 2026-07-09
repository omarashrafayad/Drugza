import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import {Coupon} from "@/types/coupons";

function useGettingCouponById() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [coupon, setCoupon] = useState<Coupon>();

    const getCouponById = async (id: string | string[] | undefined) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/Coupons/${id}`).then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch coupon');
            }
            setCoupon(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return { coupon, loading, error, getCouponById };
}

export default useGettingCouponById;