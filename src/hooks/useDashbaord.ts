// hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';

export const useDashboard = () => {
  const userId = useAppSelector((state) => state.user.id);
  console.log("User ID from store:", userId);
  return useQuery({
    queryKey: ['dashboard', userId],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/users/auth/dashboard', {
        params:  {userId} ,
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!userId, // prevents running query until userId exists
    staleTime: 1000 * 60 * 5, // optional: 5 min cache
  });
};
