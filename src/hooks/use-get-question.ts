import { useQuery } from "@tanstack/react-query";
import { type QuestionModel } from "../@types/quiz.model";
import { axiosInstance } from "../lib/utils";

const useGetQuestion = (questionId: number) => {
  return useQuery({
    queryKey: ["question", questionId],
    queryFn: () =>
      axiosInstance
        .get<QuestionModel>(`quizzes/questions/${questionId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    staleTime: 4 * 60 * 1000,
  });
};

export default useGetQuestion;
