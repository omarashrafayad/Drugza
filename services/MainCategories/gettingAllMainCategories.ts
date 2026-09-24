import { useState, useRef, useCallback } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import axios from "axios";
import { MainCategory, MainCategoriesResponse } from "@/types/mainCategory";

function useGettingAllMainCategories() {
  const [loading, setLoading] = useState<boolean>(false);
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  const abortControllerRef = useRef<AbortController | null>(null);

  const lastParamsRef = useRef({
    page: 1,
    pageSize: 10,
    lang: undefined as number | undefined,
    search: "",
  });

  const getAllMainCategories = useCallback(
    async (
      page: number = 1,
      size: number = 10,
      lang?: number,
      searchValue: string = ""
    ) => {
      lastParamsRef.current = { page, pageSize: size, lang, search: searchValue };

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
          page,
          pageSize: size,
          pageNumber: page,
          _t: Date.now(),
        };

        if (lang !== undefined) {
          params.lang = lang;
        }

        if (searchValue && searchValue.trim() !== "") {
          params.search = searchValue.trim();
        }

        const response = await AxiosInstance.get("/api/MainCategories", {
          params,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          signal: controller.signal,
        });

        if (response.status === 204) {
          setMainCategories([]);
          setTotalCount(0);
          setTotalPages(1);
          return;
        }

        if (response.status === 200 || response.status === 201) {
          const resData = response.data;

          let items: MainCategory[] = [];
          let total = 0;
          let calculatedTotalPages = 1;
          let currentPageNum = page;

          if (Array.isArray(resData)) {
            items = resData;
            total = resData.length;
            calculatedTotalPages = Math.max(1, Math.ceil(total / size));
          } else if (resData && Array.isArray(resData.items)) {
            items = resData.items;
            total = resData.totalCount ?? resData.items.length;
            calculatedTotalPages =
              resData.totalPages ?? Math.max(1, Math.ceil(total / size));
            currentPageNum = resData.pageNumber ?? page;
          } else if (resData && Array.isArray(resData.data)) {
            items = resData.data;
            total = resData.totalCount ?? resData.total ?? resData.data.length;
            calculatedTotalPages =
              resData.totalPages ?? Math.max(1, Math.ceil(total / size));
            currentPageNum = resData.pageNumber ?? page;
          }

          setMainCategories(items);
          setTotalCount(total);
          setTotalPages(Math.max(1, calculatedTotalPages));
          setPageNumber(currentPageNum);
          setPageSize(size);
          setSearch(searchValue);
        } else {
          setError("Failed to fetch main categories.");
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

  const refreshMainCategories = useCallback(() => {
    const { page, pageSize: s, lang, search: q } = lastParamsRef.current;
    return getAllMainCategories(page, s, lang, q);
  }, [getAllMainCategories]);

  return {
    loading,
    error,
    mainCategories,
    totalCount,
    totalPages,
    pageNumber,
    pageSize,
    search,
    getAllMainCategories,
    refreshMainCategories,
    setPageNumber,
    setPageSize,
    setSearch,
  };
}

export default useGettingAllMainCategories;