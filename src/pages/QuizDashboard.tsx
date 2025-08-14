import pluscircle from "../assets/images/plus-circle.png";
import Vector from "../assets/images/Vector.png";
import LayoutContainer from "../components/Layout/LayoutContainer";
import Navbar from "../components/Layout/Navbar";
import QuizList from "../components/Quiz/QuizList";
const QuizDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LayoutContainer>
        <section className="my-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Quiz Dashboard</h2>
          <button className="my-btn flex items-center gap-2 bg-my-primary text-foreground">
            <img className="object-contain" src={pluscircle} alt="pluscircle" />
            New Quiz
          </button>
        </section>
        <div className="flex flex-col rounded-xl border border-foreground-tertiary p-6">
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
          <QuizList />
        </div>
      </LayoutContainer>
    </div>
  );
};

export default QuizDashboard;
