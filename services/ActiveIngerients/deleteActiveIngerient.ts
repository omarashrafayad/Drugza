import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useDeleteActiveIngredient() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteActiveIngredient = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AxiosInstance.delete(`/api/ActiveIngerients/${id}`);
      if (response.status === 200 || response.status === 204) {
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.message ||
        "Failed to delete active ingredient";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { deleteActiveIngredient, loading, error };
}

export default useDeleteActiveIngredient;
