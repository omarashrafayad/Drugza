import { useState, useCallback } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { CategoryType } from "@/types/category";

function useGetMainCategoryCategories() {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getMainCategoryCategories = useCallback(async (mainCategoryId: string): Promise<CategoryType[]> => {
    if (!mainCategoryId) {
      setCategories([]);
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const response = await AxiosInstance.get(`/api/MainCategories/${mainCategoryId}/categories`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (response.status === 200 || response.status === 201) {
        const resData = response.data;
        let items: CategoryType[] = [];

        if (Array.isArray(resData)) {
          items = resData;
        } else if (resData && Array.isArray(resData.items)) {
          items = resData.items;
        } else if (resData && Array.isArray(resData.data)) {
          items = resData.data;
        }

        setCategories(items);
        return items;
      }

      setCategories([]);
      return [];
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.message ||
        "Failed to fetch categories for this main category.";
      setError(errorMessage);
      setCategories([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    categories,
    getMainCategoryCategories,
  };
}

export default useGetMainCategoryCategories;
