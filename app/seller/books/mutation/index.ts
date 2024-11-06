import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  CREATE_AUTHOR_ACTION,
  CREATE_CATEGORY_ACTION,
  CREATE_SUB_CATEGORY_ACTION,
} from "../action";

interface CreateAuthorMutation {
  onClose: () => void;
}

export const useCreateAuthorMutation = ({ onClose }: CreateAuthorMutation) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CREATE_AUTHOR_ACTION,
    onSuccess: async (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        onClose();
        await queryClient.invalidateQueries({
          queryKey: ["authors-for-books"],
        });
      }
    },
  });
};

interface CreateCategoryMutation {
  onClose: () => void;
}

export const useCreateCategoryMutation = ({
  onClose,
}: CreateCategoryMutation) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CREATE_CATEGORY_ACTION,
    onSuccess: async (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        onClose();
        await queryClient.invalidateQueries({
          queryKey: ["categories-for-books"],
        });
      }
    },
  });
};

interface CreateSubCategoryMutation {
  onClose: () => void;
}

export const useCreateSubCategoryMutation = ({
  onClose,
}: CreateSubCategoryMutation) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CREATE_SUB_CATEGORY_ACTION,
    onSuccess: async (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        onClose();
        await queryClient.invalidateQueries({
          queryKey: ["sub-categories-for-books"],
        });
      }
    },
  });
};
