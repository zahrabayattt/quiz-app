import type { QuestionModel } from "../../@types/quiz.model";
import useGetQuestions from "../../hooks/use-get-questions";
import QuizCard from "./QuizCard";

const QuizList = () => {
  const { data: questions = [] } = useGetQuestions();
  return questions.map((question: QuestionModel) => (
    <QuizCard key={question.id} question={question} />
  ));
};

export default QuizList;
