import { useQuery } from "@tanstack/react-query";

import {
  GET_AUTHORS,
  GET_CATEGORIES,
  GET_CATEGORIES_HOME,
  GET_PUBLICATIONS,
  GET_SUB_CATEGORIES,
} from "../action";

export const useGetAuthors = () => {
  return useQuery({
    queryKey: ["authors-for-navbar"],
    queryFn: async () => await GET_AUTHORS(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories-for-navbar"],
    queryFn: async () => await GET_CATEGORIES(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetPublications = () => {
  return useQuery({
    queryKey: ["publications-for-navbar"],
    queryFn: async () => await GET_PUBLICATIONS(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetSubCategories = (categoryId: string) => {
  return useQuery({
    queryKey: ["sub-categories-for-navbar"],
    queryFn: async () => await GET_SUB_CATEGORIES(categoryId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetCategoriesHome = () => {
  return useQuery({
    queryKey: ["categories-for-home"],
    queryFn: async () => await GET_CATEGORIES_HOME(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
