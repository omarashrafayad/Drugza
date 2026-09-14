import { useState, useRef, useCallback } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import axios from "axios";
import { ActiveIngredient } from "@/types/activeIngredient";

function useGettingAllActiveIngredients() {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeIngredients, setActiveIngredients] = useState<ActiveIngredient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  const abortControllerRef = useRef<AbortController | null>(null);

  const lastParamsRef = useRef({
    pageNumber: 1,
    pageSize: 10,
    search: "",
  });

  const getAllActiveIngredients = useCallback(
    async (
      page: number = 1,
      size: number = 10,
      searchValue: string = ""
    ) => {
      lastParamsRef.current = { pageNumber: page, pageSize: size, search: searchValue };

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);
      let isCanceled = false;

      try {
        const params: Record<string, any> = {
          pageNumber: page,
          pageSize: size,
          _t: Date.now(),
        };

        if (searchValue && searchValue.trim() !== "") {
          params.search = searchValue.trim();
        }

        const response = await AxiosInstance.get("/api/ActiveIngerients", {
          params,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          signal: controller.signal,
        });

        if (response.status === 204) {
          setActiveIngredients([]);
          setTotalItems(0);
          setTotalPages(1);
          return;
        }

        if (response.status === 200 || response.status === 201) {
          const resData = response.data;

          let items: ActiveIngredient[] = [];
          let total = 0;
          let calculatedTotalPages = 1;

          if (Array.isArray(resData)) {
            items = resData;
            total = resData.length;
            calculatedTotalPages = Math.max(1, Math.ceil(total / size));
          } else if (resData && Array.isArray(resData.items)) {
            items = resData.items;
            const hasExplicitTotal =
              resData.totalCount != null ||
              resData.totalItems != null ||
              resData.total != null ||
              resData.count != null;

            total =
              resData.totalCount ??
              resData.totalItems ??
              resData.total ??
              resData.count ??
              (resData.items.length === size ? (page + 1) * size : (page - 1) * size + resData.items.length);

            calculatedTotalPages =
              resData.totalPages ??
              (hasExplicitTotal
                ? Math.max(1, Math.ceil(total / size))
                : resData.items.length === size
                ? page + 1
                : page);
          } else if (resData && Array.isArray(resData.data)) {
            items = resData.data;
            const hasExplicitTotal =
              resData.totalCount != null ||
              resData.totalItems != null ||
              resData.total != null;

            total =
              resData.totalItems ??
              resData.totalCount ??
              resData.total ??
              (resData.data.length === size ? (page + 1) * size : (page - 1) * size + resData.data.length);

            calculatedTotalPages =
              resData.totalPages ??
              (hasExplicitTotal
                ? Math.max(1, Math.ceil(total / size))
                : resData.data.length === size
                ? page + 1
                : page);
          } else {
            items = [];
            total = 0;
            calculatedTotalPages = 1;
          }

          setActiveIngredients(items);
          setTotalItems(total);
          setTotalPages(Math.max(1, calculatedTotalPages));
          setPageNumber(page);
          setPageSize(size);
          setSearch(searchValue);
        } else {
          setError("Failed to fetch active ingredients.");
        }
      } catch (err: any) {
        if (axios.isCancel(err)) {
          isCanceled = true;
          return;
        }
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.title ||
          err.message ||
          "An unexpected error occurred.";
        setError(errorMessage);
      } finally {
        if (!isCanceled) {
          setLoading(false);
        }
      }
    },
    []
  );

  const refreshActiveIngredients = useCallback(() => {
    const { pageNumber: p, pageSize: s, search: q } = lastParamsRef.current;
    return getAllActiveIngredients(p, s, q);
  }, [getAllActiveIngredients]);

  return {
    loading,
    error,
    activeIngredients,
    totalItems,
    totalPages,
    pageNumber,
    pageSize,
    search,
    getAllActiveIngredients,
    refreshActiveIngredients,
    setPageNumber,
    setPageSize,
    setSearch,
  };
}

export default useGettingAllActiveIngredients;
