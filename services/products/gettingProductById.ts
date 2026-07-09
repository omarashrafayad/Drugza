import {useState} from "react";
import {ProductType} from "@/types/product";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingProductById() {
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<ProductType | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getProductById = async (id: string | string[] | undefined) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/Products/${id}?lang=3`).then((res) => {
            if (res.status === 200 || res.status === 201 || !res.data.errors) {
                setProduct(res.data);
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
    };

    return {
        loading,
        product,
        error,
        getProductById
    };
}

export default useGettingProductById;