import AxiosInstance from "@/lib/AxiosInstance";
import {useState} from "react";
import {PaginatedTransactionReports} from "@/types/reports";

function useTransactionBalance() {
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState<PaginatedTransactionReports | null>(null);

    const fetchTransactions = async (url: string) => {
        setLoading(true);
        try {
            const response = await AxiosInstance.get(`/api/reports/balance/transactions?${url}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch transactions balance');
            }
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions balance:', error);
        } finally {
            setLoading(false);
        }
    };
    return {
        loading,
        transactions,
        fetchTransactions
    };
}

export default useTransactionBalance;