// hooks/useDashboard.ts

import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';

export const useExplore = () => {
  const userId = useAppSelector((state) => state.user.id);
  
 
  return useQuery({
    queryKey: ['explore',userId ],
    queryFn: async () => {
      const res = await axios.get('http://192.168.1.7:5000/api/users/auth/explore', {
  withCredentials: true,
});

      return res.data;
    },
    // enabled: userId, // prevents running query until userId exists
    staleTime: 1000 * 60 * 5, // optional: 5 min cache
  });
};
