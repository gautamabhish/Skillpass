import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useExplore = () => {
  return useInfiniteQuery({
    queryKey: ['explore'],
    queryFn: async ({ pageParam = null }) => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/explore`,
        {
          params: { cursor: pageParam },
          withCredentials: true,
        }
      );
      return res.data;
    },
    getNextPageParam: (lastPage) =>{
      const cursor = lastPage?.courses?.nextCursor;
      return cursor?? undefined;
    }
,
    // ✅ REQUIRED: this tells React Query the initial `pageParam` to start from
    initialPageParam: null,

    // Optional fine-tuning
    staleTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
