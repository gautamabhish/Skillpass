
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useGetCreations = () => {
  return useQuery({
    queryKey: ['creations', 'create-quiz'],
    queryFn: async () => {
        const res = await axios.get('http://192.168.1.7:5000/api/users/auth/creations', {
          withCredentials: true,
        });
        return res.data;
      },
    enabled: false, // Don't auto-run on mount
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};