import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProfileFetch = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/get-profile`, {
        withCredentials: true,
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 50, // 5 minutes
    refetchOnWindowFocus: false, // No refetch on window focus
    refetchOnReconnect: false, // No refetch on network reconnect
    refetchOnMount: false, // No refetch on remount
  });
};