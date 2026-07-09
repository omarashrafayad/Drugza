import {useState} from 'react';
import {Orders} from "@/types/orders";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingMyOrders() {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const gettingMyOrders = async () => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/Orders/my-orders`).then((res) => {
            if (res.status === 200 || res.status === 201 || !res.data.errors) {
                setOrders(res.data);
            } else {
                const firstKey = Object.keys(res.data.errors)[0];
                const firstMessage = res.data.errors[firstKey][0];
                setError(`${firstKey}: ${firstMessage}`);
            }
        }).catch((err) => {
            const apiErrors = err?.response?.data?.errors;
            if (apiErrors && typeof apiErrors === "object") {
                const firstKey = Object.keys(apiErrors)[0];
                const firstMessage = apiErrors[firstKey][0];
                setError(`${firstKey}: ${firstMessage}`);
            } else {
                setError("An unexpected error occurred.");
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    return {orders, loading, error, gettingMyOrders};
}

export default useGettingMyOrders;