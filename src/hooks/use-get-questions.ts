import { useQuery } from "@tanstack/react-query";
import type { QuestionModel } from "../@types/quiz.model";
import { axiosInstance } from "../lib/utils";
const useGetQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: () =>
      axiosInstance
        .get<QuestionModel[]>("quizzes/questions")
        .then((res) => res.data),
    staleTime: 3 * 60 * 1000,
  });
};
export default useGetQuestions;
