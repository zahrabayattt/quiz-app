import { useNavigate } from "react-router";
import pluscircle from "../assets/images/plus-circle.png";
import Footer from "../components/Layout/Footer";
import LayoutContainer from "../components/Layout/LayoutContainer";
import Navbar from "../components/Layout/Navbar";
import QuizList from "../components/Quiz/QuizList";

const QuizDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Mobile-only footer */}
      <div className="fixed right-0 bottom-0 left-0 md:hidden">
        <Footer />
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block">
        <LayoutContainer>
          <section className="my-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Quiz Dashboard
            </h2>
            <button
              className="my-btn flex cursor-pointer items-center gap-2 bg-my-primary text-foreground"
              onClick={() => navigate("/create-quiz")}
            >
              <img
                className="object-contain"
                src={pluscircle}
                alt="pluscircle"
              />
              New Quiz
            </button>
          </section>
          <QuizList />
          <Footer />
        </LayoutContainer>
      </div>
    </div>
  );
};

export default QuizDashboard;
