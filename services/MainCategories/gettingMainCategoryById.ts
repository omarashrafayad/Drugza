import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { MainCategory } from "@/types/mainCategory";

function useGettingMainCategoryById() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mainCategory, setMainCategory] = useState<MainCategory | null>(null);

  const getMainCategory = async (id: string | string[] | undefined, lang?: number) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, any> = {};
      if (lang !== undefined) {
        params.lang = lang;
      }
      const response = await AxiosInstance.get(`/api/MainCategories/${id}`, { params });
      if (response.status === 200) {
        setMainCategory(response.data);
        return response.data;
      }
      throw new Error("Failed to fetch main category");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch main category";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { mainCategory, loading, error, getMainCategory };
}

export default useGettingMainCategoryById;