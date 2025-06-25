
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useGetCreations = () => {
  return useQuery({
    queryKey: ['creations', 'create-quiz'],
    queryFn: async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/get-creations`, {
          withCredentials: true,
        });
        return res.data;
      },
    enabled: true, // Don't auto-run on mount
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};