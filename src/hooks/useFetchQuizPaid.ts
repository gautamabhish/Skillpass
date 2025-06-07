'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

export const useFetchQuizPaid = (id:string) => {


  return useQuery({
    queryKey: ['session', id],
    queryFn: async () => {
      const res = await axios.get(`http://192.168.1.7:5000/api/quiz/fetch/paid/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
