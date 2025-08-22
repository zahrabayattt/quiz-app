import type { QuestionModel } from "../../@types/quiz.model";

interface IQuizAction {
  question: QuestionModel;
  handleQuizEdit: (id: number) => void;
  handleQuizDelete: (id: number) => void;
}

const QuizAction = ({
  question,
  handleQuizEdit,
  handleQuizDelete,
}: IQuizAction) => {
  return (
    <div className="absolute mt-10 flex flex-col gap-2 rounded-xl bg-light-foreground-tertiary px-5 py-3">
      <button
        onClick={() => handleQuizEdit(question.id)}
        className="my-btn-primary my-btn text-foreground"
      >
        Edit
      </button>
      <button
        onClick={() => handleQuizDelete(question.id)}
        className="my-btn-primary my-btn text-foreground"
      >
        Delete
      </button>
    </div>
  );
};

export default QuizAction;
