import toast from "react-hot-toast";
import type { QuestionModel } from "../../@types/quiz.model";
import QuizAnswer from "./QuizAnswer";

interface IQuizCard {
  question: QuestionModel;
}
const QuizCard = ({ question }: IQuizCard) => {
  return (
    <>
      <h3 className="mt-3 mb-5 md:text-xl font-bold text-light-foreground-primary">
        {question.question}
      </h3>
      {question.answers.map((answer) => (
        <QuizAnswer key={answer.id} answer={answer} questionId={question.id} />
      ))}
      <hr className="border-0.5 mt-7 mb-5 border-light-border-primary"></hr>
      <div>
        <button
          className="my-btn-primary my-btn cursor-pointer text-foreground"
          onClick={() => {
            toast.success("Your answer is being reviewed");
          }}
        >
          Submit answer
        </button>
      </div>
    </>
  );
};

export default QuizCard;
