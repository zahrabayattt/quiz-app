import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { QuestionModel, UpdateQuizPayload } from "../@types/quiz.model";
import { axiosInstance } from "../lib/utils";

const useUpdateQuestion = (questionId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: UpdateQuizPayload) => {
      const { data: updatedQuestion } = await axiosInstance.patch<
        Partial<UpdateQuizPayload>,
        AxiosResponse<QuestionModel>
      >(`/quizzes/questions/${questionId}`, { question: payload.title });

      const answersToDelete = updatedQuestion.answers
        .filter(
          (existingAnswer) =>
            !payload.answers.find(
              (newAnswer) => newAnswer.id === existingAnswer.id,
            ),
        )
        .map((answer) => axiosInstance.delete(`/quizzes/answers/${answer.id}`));

      const answersToUpdate = payload.answers
        .filter((answer) => answer.id)
        .map((answer) =>
          axiosInstance.patch(`/quizzes/answers/${answer.id}`, {
            answerText: answer.text,
            isCorrect: answer.isCorrect,
          }),
        );

      const answersToCreate = payload.answers
        .filter((answer) => !answer.id)
        .map((answer) =>
          axiosInstance.post(`/quizzes/answers`, {
            quizId: questionId,
            answerText: answer.text,
            isCorrect: answer.isCorrect,
          }),
        );

      await Promise.all([
        ...answersToDelete,
        ...answersToUpdate,
        ...answersToCreate,
      ]);

      return updatedQuestion;
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
