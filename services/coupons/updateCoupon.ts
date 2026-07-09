import { useState } from "react";
import AxiosInstance from "../../lib/AxiosInstance";

function useUpdateCoupon() {
    const [loading, setLoading] = useState<boolean>(false);

    const updateCoupon = async (
        id: string | string[] | undefined,
        updatedData: any
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        try {
            const response = await AxiosInstance.put(`/api/Coupons/${id}`, updatedData);
            if (response.status !== 200) {
                throw new Error("Failed to update coupon");
            }
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    return { updateCoupon, loading };
}

export default useUpdateCoupon;