import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { UserType } from "@/types/users";

function useGettingUserById() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserType | null>(null);

    const getUserById = async (id: string | string[] | undefined) => {
        // التحقق من وجود ID لتجنب طلبات خاطئة
        if (!id) return;

        setLoading(true);
        setError(null);

        try {
            // التعديل: تغيير المسار ليكون /{id} بدلاً من ?userid={id}
            const response = await AxiosInstance.get(`/api/Users/user/${id}`);

            if (response.status === 200) {
                setUser(response.data);
            } else {
                throw new Error('Failed to fetch user');
            }
        } catch (err: any) {
            // استخراج رسالة الخطأ بشكل أفضل من Axios
            const errorMessage = err.response?.data?.message || err.message || "Something went wrong";
            setError(errorMessage);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, error, getUserById };
}

export default useGettingUserById;