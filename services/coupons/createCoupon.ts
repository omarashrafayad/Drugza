import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import {Coupon} from "@/types/coupons";

function useCreateCoupon() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createCoupon = async (couponData: Coupon): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        setError(null);

        try {
            const response = await AxiosInstance.post(`/api/Coupons`, couponData);
            if (response.status !== 200 && response.status !== 201) {
                throw new Error("Failed to create coupon");
            }
            return { success: true };
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    };

    return { createCoupon, loading, error };
}

export default useCreateCoupon;