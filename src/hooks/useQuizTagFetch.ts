// hooks/useQuizTagFetch.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useQuizTagFetch = (key: string, value: string) => {
  return useQuery({
    queryKey: ['quiz', key, value], // Helps with caching
    queryFn: async () => {
      if(key==='creator') key = 'creatorName'; // Adjust key for creator search
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz/find-by`,
        {
          params: { key, value },
          withCredentials: true,
        }
      );
      return res.data;
    },
    enabled: false, // controlled fetch
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
