import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { CreateMainCategoryPayload } from "@/types/mainCategory";

function useCreateMainCategories() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMainCategory = async (
    categoryData: CreateMainCategoryPayload | FormData
  ): Promise<{ success: boolean; data?: any; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await AxiosInstance.post("/api/MainCategories", categoryData);
      if (response.status === 200 || response.status === 201) {
        return { success: true, data: response.data };
      }
      return { success: false, error: "Failed to create main category" };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.message ||
        "Failed to create main category";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    createMainCategory,
    loading,
    error,
  };
}

export default useCreateMainCategories;