import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

interface DepositCashResponse {
    success: boolean;
    error?: string;
}

function useDepositCash() {
    const [loading, setLoading] = useState(false);

    // function to deposit cash
    const depositCash = async (data: any, userId: string | string[] | undefined): Promise<DepositCashResponse> => {

        const payload = {
            amount: data.amount,
            description: data.description,
            userId: userId,
        }

        setLoading(true);

        try {
            const response = await AxiosInstance.post("/api/Balances/deposit/cash", payload);
            if (response.status !== 200) {
                throw new Error("Failed to deposit cash");
            }
            return { success: true, error: '' };
        } catch (err) {
            return { success: false, error: err instanceof Error ? err.message : 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    return { depositCash, loading };
}

export default useDepositCash;