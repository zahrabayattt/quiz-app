import { useParams } from "react-router";
import QuizForm from "../components/Quiz/QuizForm";
import useGetQuestion from "../hooks/use-get-question";

const QuizEdit = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const { data: questionData } = useGetQuestion(Number(questionId));

  if (!questionData) return <div>Loading...</div>;
  return <QuizForm mode="edit" initialData={questionData} />;
};

export default QuizEdit;
