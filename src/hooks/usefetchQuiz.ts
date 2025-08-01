'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

export const useFetchQuiz = (id:string) => {


  return useQuery({
    queryKey: ['quiz', id],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz/fetch/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!id, // prevents running query until id exists
    staleTime:  1000*60*5,
     refetchOnWindowFocus: false, // No refetch on window focus
    refetchOnReconnect: false,      // No refetch on network reconnect
    refetchOnMount: false,          // No refetch on remount
  });
};
