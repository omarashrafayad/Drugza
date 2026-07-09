import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

interface DownloadCsvHook {
    loading: boolean;
    error: string | null;
    downloadCSV: () => Promise<void>;
}

function useDownloadCsv(): DownloadCsvHook {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const downloadCSV = async (): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const response = await AxiosInstance.get('/api/Products/export-excel', {
                responseType: 'blob',
            });

            if (response.status !== 200) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            if (!response.data) {
                throw new Error('No data received from server');
            }

            const contentType = response.headers['content-type'];
            if (!contentType.includes('xlsx') && !contentType.includes('octet-stream')) {
                console.warn(`Unexpected content type: ${contentType}`);
            }

            const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);

            try {
                const a = document.createElement('a');
                a.href = url;
                a.download = 'products.xlsx';
                document.body.appendChild(a);
                a.click();

                setTimeout(() => {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 100);
            } catch (downloadError) {
                window.URL.revokeObjectURL(url);
                throw new Error('Failed to initiate download');
            }
        } catch (error) {
            console.error('Download failed:', error);
            setError(
                error instanceof Error
                    ? error.message
                    : 'An unknown error occurred while downloading the file'
            );
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, downloadCSV };
}

export default useDownloadCsv;