import { useState } from "react";
import GetUsers from "@/services/users/GetAllUsers";

function useDeactivateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Deactivates a user by ID and refreshes the users list.
   * @param userId - ID of the user to deactivate
   */
  const deactivateUser = async (
      userId: string | string[] | undefined
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/Users/deActive-user", {
        method: "POST",
        headers: {
          "Accept": "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const message = await response.text();
        throw new Error(message || "Something went wrong");
      }
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    deactivateUser,
    loading,
    error,
  };
}

export default useDeactivateUser;
