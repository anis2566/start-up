import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { SELLER_REGISTER_ACTION } from "../action";
import { useRouter } from "next/navigation";

export const useSellerRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: SELLER_REGISTER_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};
