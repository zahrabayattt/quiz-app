import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BounceLoader } from "react-spinners";
import pluscircle from "../assets/images/plus-circle.png";
import Footer from "../components/Layout/Footer";
import LayoutContainer from "../components/Layout/LayoutContainer";
import Navbar from "../components/Layout/Navbar";
import QuizList from "../components/Quiz/QuizList";
import useGetQuestions from "../hooks/use-get-questions";

const toDateKey = (d: string | Date) =>
  new Date(d).toISOString().slice(0, 10);

const QuizDashboard = () => {
  const { data: questions = [], isLoading } = useGetQuestions();
  const navigate = useNavigate();

  const dateKeys = useMemo(() => {
    const set = new Set<string>();
    for (const q of questions) set.add(toDateKey(q.createdAt));
    return Array.from(set).sort();
  }, [questions]);

  const [selectedIdx, setSelectedIdx] = useState(0);
  useEffect(() => {
    if (dateKeys.length) setSelectedIdx(0);
  }, [dateKeys.length]);

  const canPrev = selectedIdx > 0;
  const canNext = selectedIdx < Math.max(0, dateKeys.length - 1);
  const currentDateKey = dateKeys[selectedIdx] ?? null;

  const handlePrev = () => canPrev && setSelectedIdx((i) => i - 1);
  const handleNext = () => canNext && setSelectedIdx((i) => i + 1);

  return (
    <div className="min-h-screen bg-foreground">
      <Navbar
        currentDateKey={currentDateKey}
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={!canPrev}
        disableNext={!canNext}
        hasDates={dateKeys.length > 0}
      />
      <div className="fixed right-0 bottom-0 left-0 z-10 md:hidden">
        <Footer />
      </div>
      <LayoutContainer>
        <section className="flex items-center justify-between py-3 pt-8">
          <h2 className="text-xl font-bold text-light-foreground-primary md:text-3xl">
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
            <BounceLoader color="var(--color-my-primary)" size={60} />
          </div>
        )}

        <QuizList selectedDateKey={currentDateKey} />
      </LayoutContainer>
    </div>
  );
};

export default QuizDashboard;
