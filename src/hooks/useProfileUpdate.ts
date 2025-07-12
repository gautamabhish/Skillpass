
// hooks/useProfileUpdate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/update-profile`,
        data,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
