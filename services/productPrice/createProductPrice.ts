import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useCreateProductPrice() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createProductPrice = async (data: {
        productId: string;
        categoryId: string;
        purchasePrice: number | string;
        salesPrice: number | string;
        stockQuantity: number;
        maxQuantity: number;
    }): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const response = await AxiosInstance.post("/api/ProductPrices", data);

            if (![200, 201, 204].includes(response.status)) {
                throw new Error('Failed to create product price');
            }

            return true;
        } catch (err: any) {
            const apiErrors = err?.response?.data?.errors;
            if (apiErrors && typeof apiErrors === "object") {
                const firstKey = Object.keys(apiErrors)[0];
                const firstMessage = apiErrors[firstKey][0];
                setError(`${firstKey}: ${firstMessage}`);
            } else {
                setError("An unexpected error occurred.");
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createProductPrice,
    };

}

export default useCreateProductPrice;