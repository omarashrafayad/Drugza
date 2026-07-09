import AxiosInstance from "@/lib/AxiosInstance";
import { useState } from "react";
import { BrandType } from "@/types/brand";

function useGetBrandById() {
    const [loading, setLoading] = useState(false);
    const [brand, setBrand] = useState<BrandType | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getBrandById = async (id: string | number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await AxiosInstance.get(`/api/Brands/brnadbyId/${id}`);
            
            if (response?.status === 200) {
                setBrand(response.data);
                return response.data;
            } else {
                throw new Error("Brand not found");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Something went wrong";
            setError(errorMessage);
            throw errorMessage;
        } finally {
            setLoading(false);
        }
    };

    return { loading, brand, error, getBrandById };
}

export default useGetBrandById;