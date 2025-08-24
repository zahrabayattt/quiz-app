import { useEffect, useState } from "react";
import type {
  CreateQuizPayload,
  UpdateQuizPayload,
} from "../@types/quiz.model";
import { type QuestionModel } from "../@types/quiz.model";
import useCreateQuestion from "./use-create-question";
import useUpdateQuestion from "./use-update-question";

export default function useQuizCreateForm(initialData?: QuestionModel) {
  const [question, setQuestion] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([""]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [correctAnswersIds, setCorrectAnswersIds] = useState<number[]>([]);
  const [incorrectAnswersIds, setIncorrectAnswersIds] = useState<number[]>([]);
  const [statusPublic, setStatusPublic] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const createQuizMutation = useCreateQuestion();
  const updateQuizMutation = useUpdateQuestion(initialData?.id ?? 0);
  const isSubmitting =
    createQuizMutation.isPending || updateQuizMutation.isPending;

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setCorrectAnswers(
        initialData.answers.filter((a) => a.isCorrect).map((a) => a.answerText),
      );
      setIncorrectAnswers(
        initialData.answers
          .filter((a) => !a.isCorrect)
          .map((a) => a.answerText),
      );
      setCorrectAnswersIds(
        initialData.answers.filter((a) => a.isCorrect).map((a) => a.id),
      );
      setIncorrectAnswersIds(
        initialData.answers.filter((a) => !a.isCorrect).map((a) => a.id),
      );
    }
  }, [initialData]);

  const totalAnswersCount =
    correctAnswers.filter(Boolean).length +
    incorrectAnswers.filter(Boolean).length;

  const addCorrect = () => {
    setCorrectAnswers((s) => [...s, ""]);
    setCorrectAnswersIds((s) => [...s, 0]);
  };
  const addIncorrect = () => {
    setIncorrectAnswers((s) => [...s, ""]);
    setIncorrectAnswersIds((s) => [...s, 0]);
  };
  const updateCorrect = (i: number, v: string) =>
    setCorrectAnswers((s) => s.map((it, idx) => (idx === i ? v : it)));
  const updateIncorrect = (i: number, v: string) =>
    setIncorrectAnswers((s) => s.map((it, idx) => (idx === i ? v : it)));
  const removeCorrect = (i: number) => {
    setCorrectAnswers((s) => s.filter((_, idx) => idx !== i));
    setCorrectAnswersIds((s) => s.filter((_, idx) => idx !== i));
  };
  const removeIncorrect = (i: number) => {
    setIncorrectAnswers((s) => s.filter((_, idx) => idx !== i));
    setIncorrectAnswersIds((s) => s.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const filledCorrect = correctAnswers.filter((s) => s.trim());
    const filledIncorrect = incorrectAnswers.filter((s) => s.trim());

    if (!question.trim()) {
      setError("Please Enter The Question");
      return;
    }
    if (filledCorrect.length < 1) {
      setError("At Least 1 Correct Answer Needed");
      return;
    }
    if (filledCorrect.length + filledIncorrect.length < 4) {
      setError("At Least 4 Answers Needed");
      return;
    }

    const answersPayloadUpdate: UpdateQuizPayload["answers"] = [
      ...filledCorrect.map((text, i) => ({
        id: correctAnswersIds[i],
        text,
        isCorrect: true,
      })),
      ...filledIncorrect.map((text, i) => ({
        id: incorrectAnswersIds[i],
        text,
        isCorrect: false,
      })),
    ];
    const answersPayloadCreate: CreateQuizPayload["answers"] = [
      ...filledCorrect.map((text) => ({ text, isCorrect: true })),
      ...filledIncorrect.map((text) => ({ text, isCorrect: false })),
    ];

    try {
      if (initialData?.id) {
        await updateQuizMutation.mutateAsync({
          title: question.trim(),
          answers: answersPayloadUpdate,
        });
        setSuccessMsg("Question Updated Successfully");
      } else {
        await createQuizMutation.mutateAsync({
          title: question.trim(),
          answers: answersPayloadCreate,
        });
        setSuccessMsg("Question Created Successfully");
        setQuestion("");
        setCorrectAnswers([""]);
        setIncorrectAnswers(["", "", ""]);
        setCorrectAnswersIds([]);
        setIncorrectAnswersIds([]);
      }
    } catch (err) {
      setError(
        (err as Error).message || "There was a problem saving the question.",
      );
    }
  };

  return {
    question,
    correctAnswers,
    incorrectAnswers,
    correctAnswersIds,
    incorrectAnswersIds,
    statusPublic,
    error,
    successMsg,
    isSubmitting,
    totalAnswersCount,
    setQuestion,
    setStatusPublic,
    addCorrect,
    addIncorrect,
    updateCorrect,
    updateIncorrect,
    removeCorrect,
    removeIncorrect,
    handleSubmit,
  };
}
