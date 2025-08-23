import { LucideEllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { QuestionModel } from "../../@types/quiz.model";
import useGetQuestions from "../../hooks/use-get-questions";
import DeleteQuizModal from "../../pages/QuizDelete";
import QuizAction from "./QuizAction";
import QuizCard from "./QuizCard";

interface IActionType {
  type: "menu" | "delete" | "edit";
  id: number;
}

const QuizList = () => {
  const { data: questions = [] } = useGetQuestions();
  const [action, setAction] = useState<IActionType | null>(null);
  const navigate = useNavigate();

  const handleQuizAction = (id: number) => {
    setAction((prev) =>
      prev?.type === "menu" && prev.id === id ? null : { type: "menu", id },
    );
  };

  const handleQuizEdit = (id: number) => {
    navigate(`/edit-quiz/${id}`);
  };

  return (
    <div className="my-8 flex flex-col gap-10">
      {questions.map((question: QuestionModel) => (
        <div
          key={question.id}
          className="rounded-xl border border-light-border-primary p-6"
        >
          <section className="flex items-center justify-between">
            <p className="text-foreground-tertiary">John Doe Feb 28 , 2025</p>
            <div className="flex items-center justify-center gap-3">
              <button className="flex items-center rounded-2xl bg-background-positive-light px-4 py-1 text-my-secondary">
                Publish
              </button>
              <div className="relative flex">
                <LucideEllipsisVertical
                  onClick={() => handleQuizAction(question.id)}
                  className="cursor-pointer object-contain"
                />
                {action?.type === "menu" && action.id === question.id && (
                  <QuizAction
                    question={question}
                    handleQuizEdit={handleQuizEdit}
                    handleQuizDelete={(id) => setAction({ type: "delete", id })}
                  />
                )}
              </div>
            </div>
          </section>
          <hr className="border-0.5 mt-5 mb-3 border-light-border-primary"></hr>
          <QuizCard question={question} />
          {action?.type === "delete" && action.id === question.id && (
            <DeleteQuizModal
              questionId={question.id}
              quizTitle={question.question}
              onClose={() => setAction(null)}
              isOpen={true}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizList;
