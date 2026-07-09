import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useDeleteCoupon() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteCoupon = async (id: string | number | undefined): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        setError(null);
        try {
            const response = await AxiosInstance.delete(`/api/Coupons/${id}`);
            if (response.status !== 200 && response.status !== 204) {
                throw new Error('Failed to delete coupon');
            }
            return { success: true };
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || "Unknown error";
            setError(message);
            return {
                success: false,
                error: message
            };
        } finally {
            setLoading(false);
        }
    };

    return { deleteCoupon, loading, error };
}

export default useDeleteCoupon;