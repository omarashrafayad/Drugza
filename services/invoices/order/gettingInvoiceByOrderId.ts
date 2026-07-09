import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingInvoiceByOrderId() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [invoice, setInvoice] = useState<any>(null);

    const getInvoiceByOrderId = async (orderId: string) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/Invoices/order/${orderId}`).then((response) => {
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
        getInvoiceByOrderId
    }
}

export default useGettingInvoiceByOrderId;