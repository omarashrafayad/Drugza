import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

export interface CreateActiveIngredientPayload {
  name: string;
  isMeltable?: boolean;
}

function useCreateActiveIngredient() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createActiveIngredient = async (payload: CreateActiveIngredientPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AxiosInstance.post("/api/ActiveIngerients", payload);
      if (response.status === 200 || response.status === 201) {
        return response.data ?? true;
      }
      return false;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.message ||
        "Failed to create active ingredient";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createActiveIngredient, loading, error };
}

export default useCreateActiveIngredient;
