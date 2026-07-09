import { useState } from "react";
import { ProductType } from "@/types/product";
import AxiosInstance from "@/lib/AxiosInstance";

function useCreateProduct() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isCreated, setIsCreated] = useState<boolean>(false);

    const createProduct = async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            const res = await AxiosInstance.post("/api/Products", data);

            if (
                (!res.data.errors || Object.keys(res.data.errors).length === 0) &&
                (res.status === 200 || res.status === 201)
            ) {
                setIsCreated(true);
                return true
            } else {
                const firstKey = Object.keys(res.data.errors)[0];
                const firstMessage = res.data.errors[firstKey][0];
                setError(`${firstKey}: ${firstMessage}`);
            }
        } catch (err: any) {
            const apiErrors = err?.response?.data?.errors;
            if (apiErrors && typeof apiErrors === "object") {
                const firstKey = Object.keys(apiErrors)[0];
                const firstMessage = apiErrors[firstKey][0];
                setError(`${firstKey}: ${firstMessage}`);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        createProduct,
        loading,
        error,
        isCreated,
    };
}

export default useCreateProduct;