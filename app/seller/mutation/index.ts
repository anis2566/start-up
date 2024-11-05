import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { SELLER_REGISTER_ACTION } from "../action";

export const useSellerRegisterMutation = () => {
  return useMutation({
    mutationFn: SELLER_REGISTER_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        window.location.replace("/seller");
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};
