import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type {
  CreateQuizPayload,
  QuestionModel,
  UpdateQuizPayload,
} from "../@types/quiz.model";
import { axiosInstance } from "../lib/utils";

const useUpdateQuestion = (questionId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: UpdateQuizPayload) => {
      await axiosInstance.patch<
        Partial<CreateQuizPayload>,
        AxiosResponse<QuestionModel>
      >(`/quizzes/questions/${questionId}`, {
        question: payload.title,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const answersPromises = payload.answers.map((answer) =>
        axiosInstance.patch(`/quizzes/answers/${answer.id}`, {
          answerText: answer.text,
          isCorrect: answer.isCorrect,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

      await Promise.all(answersPromises);
      return questionId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question updated successfully");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Failed to update the question. Please try again");
    },
  });
};

export default useUpdateQuestion;
