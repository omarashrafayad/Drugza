import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { ActiveIngredient } from "@/types/activeIngredient";

function useGetActiveIngredientById() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ActiveIngredient | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getActiveIngredientById = async (id: string): Promise<ActiveIngredient> => {
    setLoading(true);
    setError(null);
    try {
      const response = await AxiosInstance.get(`/api/ActiveIngerients/${id}`);
      if (response.status === 200) {
        setData(response.data);
        return response.data;
      }
      throw new Error("Failed to fetch active ingredient");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.message ||
        "Failed to fetch active ingredient";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { getActiveIngredientById, data, loading, error };
}

export default useGetActiveIngredientById;
