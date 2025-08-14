import { useState } from "react";
import useCreateQuiz from "./use-create-quiz";

export default function useQuizCreateForm() {
  const [question, setQuestion] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([""]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [statusPublic, setStatusPublic] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const createQuizMutation = useCreateQuiz();
  const isSubmitting = createQuizMutation.isPending;

  // Derived state
  const totalAnswersCount =
    correctAnswers.filter(Boolean).length +
    incorrectAnswers.filter(Boolean).length;

  // Answer management functions
  const addCorrect = () => setCorrectAnswers((s) => [...s, ""]);
  const addIncorrect = () => setIncorrectAnswers((s) => [...s, ""]);

  const updateCorrect = (i: number, v: string) =>
    setCorrectAnswers((s) => s.map((it, idx) => (idx === i ? v : it)));

  const updateIncorrect = (i: number, v: string) =>
    setIncorrectAnswers((s) => s.map((it, idx) => (idx === i ? v : it)));

  const removeCorrect = (i: number) =>
    setCorrectAnswers((s) => s.filter((_, idx) => idx !== i));

  const removeIncorrect = (i: number) =>
    setIncorrectAnswers((s) => s.filter((_, idx) => idx !== i));

  // Form submission handler
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Validation
    if (!question.trim()) {
      setError("Please Enter The Question");
      return;
    }

    const filledCorrect = correctAnswers.filter((s) => s.trim());
    const filledIncorrect = incorrectAnswers.filter((s) => s.trim());

    if (filledCorrect.length < 1) {
      setError("At Least 1 Correct Answer Needed");
      return;
    }

    if (filledCorrect.length + filledIncorrect.length < 4) {
      setError("At Least 4 Answers Needed");
      return;
    }

    try {
      const answersPayload = [
        ...filledCorrect.map((text) => ({ text, isCorrect: true })),
        ...filledIncorrect.map((text) => ({ text, isCorrect: false })),
      ];

      await createQuizMutation.mutateAsync({
        title: question.trim(),
        answers: answersPayload,
      });

      setSuccessMsg("Question Created Successfully");

      // Reset form
      setQuestion("");
      setCorrectAnswers([""]);
      setIncorrectAnswers(["", "", ""]);
    } catch (err: any) {
      setError(
        err.message ||
          "There was a problem creating the question. Please try again later",
      );
    }
  };

  return {
    // State
    question,
    correctAnswers,
    incorrectAnswers,
    statusPublic,
    error,
    successMsg,
    isSubmitting,
    totalAnswersCount,

    // Setters
    setQuestion,
    setStatusPublic,

    // Functions
    addCorrect,
    addIncorrect,
    updateCorrect,
    updateIncorrect,
    removeCorrect,
    removeIncorrect,
    handleSubmit,
  };
}
