// hooks/useQuizTitleFetch.ts
import { useAppSelector } from '@/store/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useReferral = () => {
    const userId = useAppSelector((state) => state.user.id);
  return useQuery({
    queryKey: ['/share-and-earn',userId],
    queryFn: async () => {

      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/getreferrals`, {
        withCredentials: true,
      });
      console.log(res.data);
      return res.data;
    },
    enabled: true, //  Don't auto-run on mount
    staleTime:1000*5*60, 
  });
};
