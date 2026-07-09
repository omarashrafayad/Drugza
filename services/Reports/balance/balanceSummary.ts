import {SummaryBalanceReport} from "@/types/reports";
import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useBalanceSummary() {
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState<SummaryBalanceReport | null>(null);

    const fetchBalanceSummary = async (url: string) => {
        setLoading(true);
        try {
            const response = await AxiosInstance.get<SummaryBalanceReport>(`/api/reports/balance/summary?${url}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch balance summary');
            }
            setSummary(response.data);
        } catch (error) {
            console.error('Error fetching balance summary:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        summary,
        fetchBalanceSummary
    };
}

export default useBalanceSummary;