import type { AnswerModel } from "../../@types/quiz.model";
interface IQuizAnswer {
  questionId: number;
  answer: AnswerModel;
}
const QuizAnswer = ({ answer, questionId }: IQuizAnswer) => {
  return (
    <div className="mb-3 space-x-4">
      <input
        type="radio"
        name={`question-${questionId}`}
        className="radio border-3 radio-primary"
      />
      <label className="text-background">{answer.answerText}</label>
    </div>
  );
};

export default QuizAnswer;
