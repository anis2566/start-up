import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { CREATE_PUBLICATION_ACTION } from "../action";

export const useCreatePublicationMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: CREATE_PUBLICATION_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/publications");
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};
