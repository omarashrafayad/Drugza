import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

export interface UpdateActiveIngredientPayload {
  name: string;
  isMeltable?: boolean;
}

function useUpdateActiveIngredient() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateActiveIngredient = async (
    id: string,
    payload: UpdateActiveIngredientPayload
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AxiosInstance.put(`/api/ActiveIngerients/${id}`, payload);
      if (response.status === 200 || response.status === 204) {
        return response.data ?? true;
      }
      return false;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.message ||
        "Failed to update active ingredient";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateActiveIngredient, loading, error };
}

export default useUpdateActiveIngredient;
