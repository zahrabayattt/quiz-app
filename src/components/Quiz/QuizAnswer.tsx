import type { AnswerModel } from "../../@types/quiz.model";
interface IQuizAnswer {
  answer: AnswerModel;
}
const QuizAnswer = ({ answer }: IQuizAnswer) => {
  return (
    <div className="mb-3 space-x-4">
      <input
        type="checkbox"
        className="checkbox rounded-xl border-3 checkbox-primary"
      />
      <label className="text-foreground">{answer.answerText}</label>
    </div>
  );
};

export default QuizAnswer;
