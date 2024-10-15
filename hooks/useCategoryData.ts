import {
  useFetchCategoryWithProductsQuery,
  useFetchCategoryByIdQuery,
} from "@/api/categoryApi";
import { useState } from "react";

export const useCategoryData = (id: string) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: categoryData,
    error,
    isLoading,
    isFetching,
  } = useFetchCategoryWithProductsQuery(
    { categoryId: Number(id), page, limit },
    { skip: !id }
  );

  const {
    data: categoryDetails,
    isLoading: categoryLoading,
    error: categoryError,
  } = useFetchCategoryByIdQuery(Number(id), { skip: !id });

  return {
    categoryData,
    categoryDetails,
    error,
    categoryError,
    isLoading,
    categoryLoading,
    isFetching,
    page,
    setPage,
  };
};
