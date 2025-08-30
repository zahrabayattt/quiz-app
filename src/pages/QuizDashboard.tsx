import { LucideLoader2 } from "lucide-react";
import { useNavigate } from "react-router";
import pluscircle from "../assets/images/plus-circle.png";
import Footer from "../components/Layout/Footer";
import LayoutContainer from "../components/Layout/LayoutContainer";
import Navbar from "../components/Layout/Navbar";
import QuizList from "../components/Quiz/QuizList";
import useGetQuestions from "../hooks/use-get-questions";

const QuizDashboard = () => {
  const { isLoading } = useGetQuestions();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-foreground">
      <Navbar />
      <div className="fixed right-0 bottom-0 left-0 md:hidden">
        <Footer />
      </div>
      <LayoutContainer>
        <section className="flex items-center justify-between py-3 pt-8">
          <h2 className="font-bold text-light-foreground-primary md:text-2xl">
            Quiz Dashboard
          </h2>
          <button
            className="my-btn hidden cursor-pointer items-center gap-2 bg-my-primary text-white md:block"
            onClick={() => navigate("/create-quiz")}
          >
            <img
              className="inline-block object-contain pr-2"
              src={pluscircle}
              alt="pluscircle"
            />
            New Quiz
          </button>
        </section>
        {isLoading && (
          <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center gap-5">
            <LucideLoader2 className="animate-spin text-my-primary" />
            <p className="text-my-primary">Questions are loading...</p>
          </div>
        )}
        <QuizList />
      </LayoutContainer>
    </div>
  );
};

export default QuizDashboard;
