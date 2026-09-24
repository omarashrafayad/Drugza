import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useDeleteMainCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMainCategory = async (
    categoryId: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);
    try {
      const response = await AxiosInstance.delete(`/api/MainCategories/${categoryId}`);

      if (response.status === 200 || response.status === 204) {
        return { success: true };
      }

      throw new Error("Failed to delete main category");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.message ||
        "Failed to delete main category";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteMainCategory,
    loading,
    error,
  };
}

export default useDeleteMainCategory;