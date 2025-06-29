// hooks/useDashboard.ts

import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';

export const useExplore = () => {
  const userId = useAppSelector((state) => state.user.id);
  
 
  return useQuery({
    queryKey: ['explore',userId ],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/explore`, {
  withCredentials: true,
});

      return res.data;
    },
    // enabled: userId, // prevents running query until userId exists
    staleTime: 1000 * 60 * 5, // optional: 5 min cache
     refetchOnWindowFocus: false, // No refetch on window focus
    refetchOnReconnect: false,      // No refetch on network reconnect
    refetchOnMount: false,          // No refetch on remount
  });
};
