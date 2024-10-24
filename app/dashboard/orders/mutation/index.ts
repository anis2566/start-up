import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { UPDATE_ORDER_STATUS_ACTION } from "../action";

type UpdateOrderStatusProps = {
  onClose: () => void;
};

export const useUpdateOrderStatusMutation = ({
  onClose,
}: UpdateOrderStatusProps) => {
  return useMutation({
    mutationFn: UPDATE_ORDER_STATUS_ACTION,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        onClose();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
