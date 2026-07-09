import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { SummaryReport } from "@/types/reports";

function useSummaryReports() {
    const [loading, setLoading] = useState(false);
    const [summaryReports, setSummaryReports] = useState<SummaryReport | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchSummaryReports = async (url: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await AxiosInstance.get(`/api/reports/summary?${url}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch summary reports');
            }
            setSummaryReports(response.data);
        } catch (error) {
            console.error('Error fetching summary reports:', error);
            setError(error instanceof Error ? error.message : 'Unknown error');
            setSummaryReports(null);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        summaryReports,
        fetchSummaryReports
    };
}

export default useSummaryReports;