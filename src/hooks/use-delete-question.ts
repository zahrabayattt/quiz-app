import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/utils";

const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (questionId: number) =>
      axiosInstance.delete(`quizzes/questions/${questionId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error: Error) => {
      console.error(`Failed to delete quiz: ${error.message}`);
    },
  });
};

export default useDeleteQuestion;
