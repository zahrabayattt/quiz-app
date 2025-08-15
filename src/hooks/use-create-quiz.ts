import { useMutation } from "@tanstack/react-query";
import type { CreateQuizPayload } from "../@types/quiz.model";
import { axiosInstance } from "../lib/utils";

const useCreateQuiz = () => {
  return useMutation({
    mutationFn: async (payload: CreateQuizPayload) => {
      // 1. Create question
      const questionResponse = await axiosInstance.post("/quizzes/questions", {
        title: payload.title,
      });

      const questionId = questionResponse.data?.id;
      if (!questionId) throw new Error("Failed to create question");

      // 2. Create answers
      const answersPromises = payload.answers.map((answer) =>
        axiosInstance.post("/quizzes/answers", {
          questionId,
          text: answer.text,
          isCorrect: answer.isCorrect,
        }),
      );

      await Promise.all(answersPromises);
      return questionId;
    },
  });
};

export default useCreateQuiz;
