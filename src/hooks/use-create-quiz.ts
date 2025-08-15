import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { CreateQuizPayload, QuestionModel } from "../@types/quiz.model";
import { axiosInstance } from "../lib/utils";

const useCreateQuiz = () => {
  return useMutation({
    mutationFn: async (payload: CreateQuizPayload) => {
      // 1. Create question
      const questionResponse = await axiosInstance.post<
        CreateQuizPayload,
        AxiosResponse<QuestionModel>
      >("/quizzes/questions", {
        question: payload.title,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const quizId = questionResponse.data?.id;
      if (!quizId) throw new Error("Failed to create question");

      // 2. Create answers
      const answersPromises = payload.answers.map((answer) =>
        axiosInstance.post("/quizzes/answers", {
          quizId,
          answerText: answer.text,
          isCorrect: answer.isCorrect,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

      await Promise.all(answersPromises);
      return quizId;
    },
  });
};

export default useCreateQuiz;
