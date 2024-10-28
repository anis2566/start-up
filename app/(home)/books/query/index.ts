import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import kyInstance from "@/lib/ky";
import { ReviewPage } from "@/lib/types";
import { GET_SIMILAR_CATEGORY_BOOKS, GET_TOP_REVIEWS } from "../action";

export const useGetBookReviews = ({ bookId }: { bookId: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["reviews", bookId],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            `/api/reviews/${bookId}`,
            pageParam ? { searchParams: { cursor: pageParam } } : {},
          )
          .json<ReviewPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (firstPage) => firstPage.previousCursor,
      select: (data) => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  const reviews = data?.pages.flatMap((page) => page.reviews) || [];

  return {
    reviews,
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,
  };
};

export const useGetTopReviews = ({ bookId }: { bookId: string }) => {
  const { data, isFetching, status } = useQuery({
    queryKey: ["top-reviews", bookId],
    queryFn: () => GET_TOP_REVIEWS(bookId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    reviews: data,
    isFetching,
    status,
  };
};

export const useGetSimilarCategoryBooks = ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const { data, isFetching, status } = useQuery({
    queryKey: ["similar-category-books", categoryId],
    queryFn: () => GET_SIMILAR_CATEGORY_BOOKS(categoryId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    books: data,
    isFetching,
    status,
  };
};
