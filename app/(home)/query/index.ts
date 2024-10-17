import { useQuery } from "@tanstack/react-query";

import { GET_AUTHORS, GET_CATEGORIES, GET_PUBLICATIONS } from "../action";

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
