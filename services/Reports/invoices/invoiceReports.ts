import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { PaginatedInvoiceReports } from "@/types/reports";

function useInvoiceReports() {
    const [loading, setLoading] = useState(false);
    const [invoicesReports, setInvoiceReports] = useState<PaginatedInvoiceReports | null>(null);

    const fetchInvoiceReports = async (url: string) => {
        setLoading(true);
        try {
            const response = await AxiosInstance.get<PaginatedInvoiceReports>(`/api/reports/invoices?${url}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch Invoices reports');
            }
            setInvoiceReports(response.data);
        } catch (error) {
            console.error('Error fetching Invoices reports:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        invoicesReports,
        fetchInvoiceReports
    };
}

export default useInvoiceReports;