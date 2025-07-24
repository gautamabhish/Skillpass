import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useDeepAnalysis = (quizId:string) => {
  return useQuery({
    queryKey: ['deepAnalysis', quizId],
    queryFn: async () => {
      
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz/attempt-analysis/${quizId}`,
        { withCredentials: true }
      );
      
      return res.data;
    },
    enabled: !!quizId, // prevents running query until quizId exists
    staleTime: 1000 * 60 * 15, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}