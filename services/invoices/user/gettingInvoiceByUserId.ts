import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingInvoiceByUserId() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [invoice, setInvoice] = useState<any>(null);

    const getInvoiceByUserId = async (userId: string) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/Invoices/user/${userId}`).then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch invoice');
            }
            setInvoice(response.data);
        })
        .catch((error) => {
            setError(error instanceof Error ? error.message : 'Failed to fetch invoice');
        })
        .finally(() => {
            setLoading(false);
        });
    };
    return {
        loading,
        error,
        invoice,
        getInvoiceByUserId
    }
}

export default useGettingInvoiceByUserId;