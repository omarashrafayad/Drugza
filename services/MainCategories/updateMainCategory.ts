import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { MainCategory, UpdateMainCategoryPayload } from "@/types/mainCategory";

export interface UpdateMainCategoryResponse {
  success: boolean;
  data?: MainCategory;
  error?: string;
}

function useUpdateMainCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateMainCategory = async (
    categoryId: string,
    categoryData: UpdateMainCategoryPayload | FormData
  ): Promise<UpdateMainCategoryResponse> => {
    try {
      setLoading(true);
      setError(null);

      const response = await AxiosInstance.put<MainCategory>(
        `/api/MainCategories/${categoryId}`,
        categoryData
      );

      if (
        response.status === 200 ||
        response.status === 204 ||
        response.status === 201
      ) {
        return {
          success: true,
          data: response.data,
        };
      }

      throw new Error("Failed to update main category");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.message ||
        "Failed to update main category";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateMainCategory,
    loading,
    error,
  };
}

export default useUpdateMainCategory;