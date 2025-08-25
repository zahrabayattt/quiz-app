import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
        initialData.answers.filter((question) => question.isCorrect).map((question) => question.answerText),
      );
      setIncorrectAnswers(
        initialData.answers
          .filter((question) => !question.isCorrect)
          .map((question) => question.answerText),
      );
      setCorrectAnswersIds(
        initialData.answers.filter((question) => question.isCorrect).map((question) => question.id),
      );
      setIncorrectAnswersIds(
        initialData.answers.filter((question) => !question.isCorrect).map((question) => question.id),
      );
    }
  }, [initialData]);

  const totalAnswersCount =
    correctAnswers.filter(Boolean).length +
    incorrectAnswers.filter(Boolean).length;

  const addCorrect = () => {
    if (totalAnswersCount >= 4)
      return toast.error("You can only have 4 answers");
    setCorrectAnswers((answer) => [...answer, ""]);
    setCorrectAnswersIds((answer) => [...answer, 0]);
  };
  const addIncorrect = () => {
    if (totalAnswersCount >= 4)
      return toast.error("You can only have 4 answers");
    setIncorrectAnswers((answer) => [...answer, ""]);
    setIncorrectAnswersIds((answer) => [...answer, 0]);
  };
  const updateCorrect = (AnsNum: number, QText: string) =>
    setCorrectAnswers((answer) => answer.map((it, id) => (id === AnsNum ? QText : it)));
  const updateIncorrect = (AnsNum: number, QText: string) =>
    setIncorrectAnswers((answer) => answer.map((it, id) => (id === AnsNum ? QText : it)));
  const removeCorrect = (AnsNum: number) => {
    if (correctAnswers.length <= 1)
      return toast.error("At least 1 correct answer needed");
    setCorrectAnswers((answer) => answer.filter((_, id) => id !== AnsNum));
    setCorrectAnswersIds((answer) => answer.filter((_, id) => id !== AnsNum));
  };
  const removeIncorrect = (i: number) => {
    setIncorrectAnswers((answer) => answer.filter((_, id) => id !== i));
    setIncorrectAnswersIds((answer) => answer.filter((_, id) => id !== i));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!question.trim()) return toast.error("Please enter the question");

    const filledCorrect = correctAnswers.filter((answer) => answer.trim());
    const filledIncorrect = incorrectAnswers.filter((answer) => answer.trim());

    if ([...filledCorrect, ...filledIncorrect].some((question) => !question.trim()))
      return toast.error("Please fill all answers");

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
