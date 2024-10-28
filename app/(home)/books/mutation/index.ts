import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { ReviewSchema } from "@/schema/review.schema";
import { CREATE_REVIEW_ACTION } from "../action";
import { ReviewPage } from "@/lib/types";

interface Props {
  onClose: () => void;
  form: UseFormReturn<z.infer<typeof ReviewSchema>>;
  bookId: string;
}

export const useCreateReviewMutation = ({ onClose, form, bookId }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CREATE_REVIEW_ACTION,
    onSuccess: async (data) => {
      const queryKey: QueryKey = ["reviews", bookId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<ReviewPage, string | null>>(
        queryKey,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (firstPage && data.review) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  previousCursor: firstPage.previousCursor,
                  reviews: [...firstPage.reviews, data.review],
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
          return oldData;
        },
      );

      queryClient.invalidateQueries({
        queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
      toast.success(data.success);
      onClose();
    },
    onSettled: () => {
      form.reset();
    },
  });
};
