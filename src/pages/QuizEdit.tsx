import { LucideLoader2 } from "lucide-react";
import { useParams } from "react-router";
import Navbar from "../components/Layout/Navbar";
import QuizForm from "../components/Quiz/QuizForm";
import useGetQuestion from "../hooks/use-get-question";

const QuizEdit = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const { data: questionData } = useGetQuestion(Number(questionId));
  return (
    <>
      {questionData ? (
        <QuizForm mode="edit" initialData={questionData} />
      ) : (
        <>
          <Navbar />
          <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center gap-5">
            <LucideLoader2 className="animate-spin text-my-primary" />
            <p className="text-my-primary">Question is loading...</p>
          </div>
        </>
      )}
    </>
  );
};

export default QuizEdit;
