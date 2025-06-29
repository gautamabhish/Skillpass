import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useGetCreations = () => {
  return useQuery({
    queryKey: ['creations', 'create-quiz'],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/get-creations`, {
        withCredentials: true,
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 7,       // 5 minutes
    refetchOnWindowFocus: false, // No refetch on window focus
    refetchOnReconnect: false,      // No refetch on network reconnect
    refetchOnMount: false,          // No refetch on remount
  });
};
