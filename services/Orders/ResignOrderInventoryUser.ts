import React from 'react';
import AxiosInstance from "@/lib/AxiosInstance";

function UseResignOrderInventoryUser() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const resignOrder = async (id: string | string[] | undefined, userId: string, OrderItems: any): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        setError(null);
        try {
            const response = await AxiosInstance.post(`/api/Orders/re-assign`, {
                orderId: id,
                userId: userId,
                OrderItemIds: OrderItems
            });
            if (response.status !== 200) {
                throw new Error(response.data.message || 'An unexpected error occurred');
            }
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error?.message || 'An unexpected error occurred' };
        } finally {
            setLoading(false);
        }
    }

    return { resignOrder, loading, error };
}

export default UseResignOrderInventoryUser;