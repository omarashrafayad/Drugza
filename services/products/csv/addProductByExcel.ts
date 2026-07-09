import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function addProductsByExcel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addProductsByExcel = async (
    file: File,
    returnFile: boolean = false
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await AxiosInstance.post(
        `/api/Products/AddProduct?returnFile=${returnFile}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Important: Handle binary response
        }
      );

      if (response.status === 200) {
        setSuccess(true);

        // Check if response contains a file (failed entries)
        const contentType = response.headers["content-type"];
        const contentDisposition = response.headers["content-disposition"];

        let downloadedFile = null;

        // If response is an Excel file, it means there were validation errors
        if (
          contentType?.includes("spreadsheet") ||
          contentType?.includes("excel") ||
          contentDisposition?.includes("attachment")
        ) {
          // Extract filename from content-disposition header
          let filename = "Failed_Products.xlsx";
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(
              /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
            );
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1].replace(/['"]/g, "");
            }
          }

          // Create blob and download file
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);

          try {
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();

            // Cleanup
            setTimeout(() => {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            }, 100);

            downloadedFile = filename;
          } catch (downloadError) {
            window.URL.revokeObjectURL(url);
            console.error(
              "Failed to download failed entries file:",
              downloadError
            );
          }
        }

        return {
          success: true,
          data: response.data,
          hasFailedEntries: !!downloadedFile,
          failedEntriesFile: downloadedFile,
        };
      } else {
        throw new Error("Upload failed");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to upload file";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        hasFailedEntries: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    addProductsByExcel,
  };
}

export default addProductsByExcel;
