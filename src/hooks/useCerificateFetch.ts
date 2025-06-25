

import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';

export const useCertificateFetch = (certificateId:string) => {

  return useQuery({
    queryKey: ['certificate',certificateId ],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/certificate/${certificateId}`, {
  withCredentials: true,
});

      return res.data;
    },
    enabled: !!certificateId, // prevents running query until certificateId exists
    staleTime: 1000 * 60 * 5, // optional: 5 min cache
  });
};
