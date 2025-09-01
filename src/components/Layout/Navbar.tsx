import { LucideChevronFirst, LucideChevronLast } from "lucide-react";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Avatar from "../../assets/images/avatar.png";
import useGetQuestions from "../../hooks/use-get-questions";
import { customDate } from "../../lib/utils";
import LayoutContainer from "./LayoutContainer";

const Navbar = () => {
  const { data: questions = [] } = useGetQuestions();
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute("data-theme") === "dark",
  );
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (!localStorage.getItem("theme")) {
        const osDark = mql.matches;
        setIsDark(osDark);
        apply(osDark ? "dark" : "light", false);
      }
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const apply = (theme: "light" | "dark", persist = true) => {
    if (persist) localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  };

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    apply(next ? "dark" : "light");
  };
  return (
    <header className="bg-header-bg py-4">
      <LayoutContainer className="flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-background">
          Quiz
        </a>
        {questions?.length > 0 && (
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-between">
            <LucideChevronFirst />
            <p className="text-sm font-bold md:mx-5 md:text-base">
              {customDate(new Date(questions[questions.length - 1].createdAt))}
            </p>
            <LucideChevronLast />
          </div>
        )}
        <div className="flex items-center gap-3">
          <button
            className="btn gap-2 border-none btn-ghost"
            aria-label="Toggle dark mode"
            onClick={toggle}
            title={isDark ? "Switch to light" : "Switch to dark"}
          >
            {isDark ? <FiSun /> : <FiMoon />}
            <span className="hidden sm:inline">
              {isDark ? "Light" : "Dark"}
            </span>
          </button>
          <img src={Avatar} alt="Avatar" />
        </div>
      </LayoutContainer>
    </header>
  );
};

export default Navbar;
