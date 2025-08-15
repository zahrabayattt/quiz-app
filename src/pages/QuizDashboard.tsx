import { useNavigate } from "react-router";
import pluscircle from "../assets/images/plus-circle.png";
import LayoutContainer from "../components/Layout/LayoutContainer";
import Navbar from "../components/Layout/Navbar";
import QuizList from "../components/Quiz/QuizList";

const QuizDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LayoutContainer>
        <section className="my-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Quiz Dashboard</h2>
          <button
            className="my-btn flex cursor-pointer items-center gap-2 bg-my-primary text-foreground"
            onClick={() => navigate("/create-quiz")}
          >
            <img className="object-contain" src={pluscircle} alt="pluscircle" />
            New Quiz
          </button>
        </section>
        <QuizList />
      </LayoutContainer>
    </div>
  );
};

export default QuizDashboard;
