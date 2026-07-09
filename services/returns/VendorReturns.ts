import {useState} from "react";
import {Orders} from "@/types/orders";
import AxiosInstance from "@/lib/AxiosInstance";

function useVendorReturns() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [returns, setReturns] = useState<Orders[]>([]);

    const gettingVendorReturns = async () => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/returns/vendor`).then((res) => {
            if (res.status === 200 || res.status === 201 || !res.data.errors) {
                setReturns(res.data);
            } else {
                throw new Error(res.data.message || res.data.error || "Something went wrong");
            }
        }).catch((err) => {
            const apiErrors = err?.response?.data?.errors;
            if (apiErrors && typeof apiErrors === "object") {
                const firstKey = Object.keys(apiErrors)[0];
                const firstMessage = apiErrors[firstKey][0];
                setError(`${firstKey}: ${firstMessage}`);
            } else {
                setError("An unexpected error occurred");
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    return {loading, error, returns, gettingVendorReturns};
}

export default useVendorReturns;
