// hooks/useQuizTitleFetch.ts
import { useAppSelector } from '@/store/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useReferral = () => {
    const userId = useAppSelector((state) => state.user.id);
  return useQuery({
    queryKey: ['/share-and-earn',userId],
    queryFn: async () => {
      const res = await axios.get(`https://edutrust-backend.onrender.com/api/users/auth/getreferrals`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: false, //  Don't auto-run on mount
    staleTime: 1000 * 60 * 5,
  });
};
