// hooks/useQuizTitleFetch.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useQuizTitleFetch = (title: string) => {
  return useQuery({
    queryKey: ['quiz/title', title],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz/search/${title}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: false, //  Don't auto-run on mount
    staleTime: 1000 * 60 * 5,
  });
};
