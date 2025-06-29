// hooks/useQuizTitleFetch.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useQuizTagFetch = (tag: string) => {
  return useQuery({
    queryKey: ['quiz/tag', tag],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz/find-by-tag/${tag}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: false, //  Don't auto-run on mount
    staleTime: 1000 * 60 * 5,
     refetchOnWindowFocus: false, // No refetch on window focus
    refetchOnReconnect: false,      // No refetch on network reconnect
    refetchOnMount: false,          // No refetch on remount
  });
};
