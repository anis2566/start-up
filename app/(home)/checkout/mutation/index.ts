import { useMutation } from "@tanstack/react-query";

import { CREATE_ORDER_ACTION } from "../action";
import { toast } from "sonner";

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: CREATE_ORDER_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        // router.push("/checkout/success");
      } else {
        toast.error(data.error);
      }
    },
  });
};
