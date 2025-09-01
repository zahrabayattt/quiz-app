import { LucideDot, LucideEllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { QuestionModel } from "../../@types/quiz.model";
import useGetQuestions from "../../hooks/use-get-questions";
import { specificDate } from "../../lib/utils";
import DeleteQuizModal from "../../pages/QuizDelete";
import QuizAction from "./QuizAction";
import QuizCard from "./QuizCard";

interface IActionType {
  type: "menu" | "delete" | "edit";
  questionid: number;
}

const QuizList = () => {
  const { data: questions = [] } = useGetQuestions();
  const [action, setAction] = useState<IActionType | null>(null);
  const navigate = useNavigate();

  const handleQuizAction = (questionid: number) => {
    setAction((prev) =>
      prev?.type === "menu" && prev.questionid === questionid
        ? null
        : { type: "menu", questionid },
    );
  };

  const handleQuizEdit = (id: number) => {
    navigate(`/edit-quiz/${id}`);
  };

  return (
    <div className="flex flex-col gap-10 py-8">
      {questions.map((question: QuestionModel) => (
        <div
          key={question.id}
          className="rounded-xl border border-light-border-primary p-6"
        >
          <section className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <p className="text-xs whitespace-nowrap text-foreground-tertiary md:text-sm">
                John Doe
              </p>
              <LucideDot />
              <p className="text-xs whitespace-nowrap text-foreground-tertiary md:text-sm">
                {specificDate(question.createdAt)}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button className="flex items-center rounded-2xl bg-background-positive-light px-4 py-1 text-my-secondary dark:text-white">
                Publish
              </button>
              <div className="relative flex">
                <LucideEllipsisVertical
                  onClick={() => handleQuizAction(question.id)}
                  className="cursor-pointer object-contain"
                />
                {action?.type === "menu" &&
                  action.questionid === question.id && (
                    <QuizAction
                      question={question}
                      handleQuizEdit={handleQuizEdit}
                      handleQuizDelete={(questionid) =>
                        setAction({ type: "delete", questionid })
                      }
                    />
                  )}
              </div>
            </div>
          </section>
          <hr className="border-0.5 mt-5 mb-3 border-light-border-primary"></hr>
          <QuizCard question={question} />
          {action?.type === "delete" && action.questionid === question.id && (
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
