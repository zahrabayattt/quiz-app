import type { QuestionModel } from "../../@types/quiz.model";
import Vector from "../../assets/images/Vector.png";
import useGetQuestions from "../../hooks/use-get-questions";
import QuizCard from "./QuizCard";

const QuizList = () => {
  const { data: questions = [] } = useGetQuestions();
  return (
    <div className="flex flex-col gap-10">
      {questions.map((question: QuestionModel) => (
        <div className="flex flex-col gap-10">
          <div className="rounded-xl border border-foreground-tertiary p-6">
            <section className="flex items-center justify-between">
              <p className="text-foreground-tertiary">John Doe Feb 28 , 2025</p>
              <div className="flex gap-3">
                <button className="flex items-center rounded-2xl bg-white px-4 py-1 text-my-secondary">
                  Publish
                </button>
                <img className="object-contain" src={Vector} alt="Vector" />
              </div>
            </section>
            <hr className="border-0.5 mt-5 mb-3 border-foreground-tertiary"></hr>
            <QuizCard key={question.id} question={question} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
