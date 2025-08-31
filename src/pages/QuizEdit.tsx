import { useParams } from "react-router";
import { BounceLoader } from "react-spinners";
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
            <BounceLoader color="var(--color-my-primary)" size={60} />
          </div>
        </>
      )}
    </>
  );
};

export default QuizEdit;
