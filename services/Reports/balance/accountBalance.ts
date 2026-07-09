import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import {PaginatedAccountBalances} from "@/types/reports";

function useAccountBalance() {
    const [loading, setLoading] = useState(false);
    const [balances, setBalances] = useState<PaginatedAccountBalances | null>(null);

    const gettingAccountBalances = async (url: string) => {
        setLoading(true);
        await AxiosInstance.get(`/api/reports/balance/accounts?${url}`).then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch balance for user');
            }
            setBalances(response.data);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setLoading(false);
        })
    }
    return {
        loading,
        balances,
        gettingAccountBalances
    };
}

export default useAccountBalance;