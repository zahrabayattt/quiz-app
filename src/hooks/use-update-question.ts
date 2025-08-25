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
        headers: { "Content-Type": "application/json" },
      });

      const { data: prevData } = await axiosInstance.get<QuestionModel>(
        `/quizzes/questions/${questionId}`,
      );

      const prevIds = prevData.answers.map((a) => a.id);
      const newIds = payload.answers.map((a) => a.id).filter(Boolean);

      const deletePromises = prevIds
        .filter((id) => !newIds.includes(id))
        .map((id) => axiosInstance.delete(`/quizzes/answers/${id}`));

      const updatePromises = payload.answers
        .filter((a) => a.id)
        .map((a) =>
          axiosInstance.patch(`/quizzes/answers/${a.id}`, {
            answerText: a.text,
            isCorrect: a.isCorrect,
            headers: { "Content-Type": "application/json" },
          }),
        );

      const createPromises = payload.answers
        .filter((a) => !a.id)
        .map((a) =>
          axiosInstance.post(`/quizzes/answers`, {
            questionId,
            answerText: a.text,
            isCorrect: a.isCorrect,
            headers: { "Content-Type": "application/json" },
          }),
        );

      await Promise.all([
        ...deletePromises,
        ...updatePromises,
        ...createPromises,
      ]);

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
