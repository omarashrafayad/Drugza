import AxiosInstance from "@/lib/AxiosInstance";
import { useState } from "react";
import { BrandType } from "@/types/brand";
function useGetBrands() {
    const [loading, setLoading] = useState(false);
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getAllBrands = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await AxiosInstance.get("/api/Brands/all-brands");
            
            if (response?.status === 200) {
                setBrands(response.data);
                return response.data;
            } else {
                throw new Error("Failed to fetch brands");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Something went wrong";
            setError(errorMessage);
            throw errorMessage;
        } finally {
            setLoading(false);
        }
    };

    return { loading, brands, error, getAllBrands };
}

export default useGetBrands;