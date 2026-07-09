import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import {PaginatedInvoiceReports} from "@/types/reports";

function useOrderReports() {
    const [loading, setLoading] = useState(false);
    const [orderReports, setOrderReports] = useState<PaginatedInvoiceReports | null>(null);

    // Function to fetch order reports
    const fetchOrderReports = async (url: string) => {
        setLoading(true);
        try {
            // Simulate an API call to fetch order reports
            const response = await AxiosInstance.get(`/api/reports/orders?${url}`); // Replace with your actual API endpoint
            if (response.status !== 200) {
                throw new Error('Failed to fetch order reports');
            }
            setOrderReports(response.data);
        } catch (error) {
            console.error('Error fetching order reports:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        orderReports,
        fetchOrderReports
    };
}

export default useOrderReports;