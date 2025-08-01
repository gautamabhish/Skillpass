'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchQuizPaid = (id: string) => {
  return useQuery({
    queryKey: ['session', id],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz/fetch/paid/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!id,
    staleTime: 0, // Always stale
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
