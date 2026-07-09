import AxiosInstance from "@/lib/AxiosInstance";
import {useState} from "react";
import {CategoryType} from "@/types/category";

function useCreateCategory() {
    const [loading, setLoading] = useState(false);

    const creatingCategory = async (data: CategoryType) => {
        setLoading(true);
        try {
            const response = await AxiosInstance.post("/api/Categories", data);
            if (response?.status === 200 || response?.status === 201) {
                return true;
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err: any) {
            throw err.response?.data?.message || err.message;
        } finally {
            setLoading(false);
        }
    };

    return { loading, creatingCategory };
}

export default useCreateCategory;