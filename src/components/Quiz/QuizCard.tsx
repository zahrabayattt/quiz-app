import type { QuestionModel } from "../../@types/question.model";
import QuizAnswer from "./QuizAnswer";
interface IQuizCard {
  question: QuestionModel;
}
const QuizCard = ({ question }: IQuizCard) => {
  return (
    <>
      <h3 className="mt-3 mb-5 text-xl font-bold text-foreground">
        {question.question}
      </h3>
      {question.answers.map((answer) => (
        <QuizAnswer key={answer.id} answer={answer} />
      ))}
      <hr className="border-0.5 mt-7 mb-5 border-foreground-tertiary"></hr>
      <button className="my-btn-primary my-btn text-foreground">
        Submit answer
      </button>
    </>
  );
};

export default QuizCard;
