import { useState } from "react";
import useDeleteQuestion from "../hooks/use-delete-question";

type DeleteQuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
  quizTitle: string;
  questionId: number;
};

const DeleteQuizModal = ({
  isOpen,
  onClose,
  quizTitle,
  questionId,
}: DeleteQuizModalProps) => {
  const [reason, setReason] = useState("");
  const { mutate: deleteQuestion, isPending } = useDeleteQuestion();

  const handleSubmit = () => {
    deleteQuestion(questionId, {
      onSuccess: () => {
        onClose();
        setReason("");
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-foreground shadow-lg">
        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-background">
            <span className="text-error">Delete</span> : {quizTitle}
          </h3>

          <p className="mb-6 text-foreground-tertiary">
            Are you sure you want to delete [
            <span className="text-error">{quizTitle}</span>]?
          </p>

          <div className="mb-6">
            <label htmlFor="reason" className="mb-2 block text-border-primary">
              Reason
            </label>
            <textarea
              id="reason"
              placeholder="Write a reason"
              className="w-full rounded-lg border border-foreground-tertiary p-3 focus:border-transparent focus:ring-2 focus:ring-my-primary"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-end gap-3 sm:flex-row">
            <button
              onClick={onClose}
              disabled={isPending}
              className="rounded-lg border border-foreground-tertiary px-4 py-2 text-background transition-colors hover:bg-foreground-primary disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className={`rounded-lg px-4 py-2 text-white transition-colors ${
                isPending
                  ? "bg-foreground-tertiary"
                  : "bg-error hover:bg-red-700"
              }`}
            >
              {isPending ? "Deleting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuizModal;
