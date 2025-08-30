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
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-foreground rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-xl font-bold text-background mb-2">
            <span className="text-error">Delete</span> : {quizTitle}
          </h3>
          
          <p className="text-foreground-tertiary mb-6">
            Are you sure you want to delete [<span className="text-error">{quizTitle}</span>]?
          </p>
          
          <div className="mb-6">
            <label htmlFor="reason" className="block text-border-primary mb-2">
              Reason
            </label>
            <textarea
              id="reason"
              placeholder="Write a reason"
              className="w-full p-3 border border-foreground-tertiary rounded-lg focus:ring-2 focus:ring-my-primary focus:border-transparent"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 border border-foreground-tertiary rounded-lg text-background hover:bg-foreground-primary transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className={`px-4 py-2 rounded-lg text-foreground transition-colors ${
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