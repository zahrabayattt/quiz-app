import { LucideChevronFirst, LucideChevronLast } from "lucide-react";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Avatar from "../../assets/images/avatar.png";
import { customDate } from "../../lib/utils";
import LayoutContainer from "./LayoutContainer";

type NavbarProps = {
  currentDateKey?: string | null;
  onPrev?: () => void;
  onNext?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  hasDates?: boolean;
};

const Navbar = (props: NavbarProps) => {
  const {
    currentDateKey = null,
    onPrev,
    onNext,
    disablePrev = true,
    disableNext = true,
    hasDates = false,
  } = props;

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

  // Only show navigator if all the needed bits exist
  const showNavigator = !!(hasDates && currentDateKey && onPrev && onNext);

  return (
    <header className="bg-header-bg py-4">
      <LayoutContainer className="flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-background">
          Quiz
        </a>

        {showNavigator && (
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-between">
            <button
              aria-label="Previous quiz date"
              onClick={onPrev}
              disabled={disablePrev}
              className="disabled:opacity-40"
            >
              <LucideChevronFirst />
            </button>
            <p className="text-sm font-bold whitespace-nowrap md:mx-5 md:text-base">
              {customDate(new Date(currentDateKey))}
            </p>
            <button
              aria-label="Next quiz date"
              onClick={onNext}
              disabled={disableNext}
              className="disabled:opacity-40"
            >
              <LucideChevronLast />
            </button>
          </div>
        )}

        <div className="flex items-center gap-1 md:gap-6">
          <button
            className="btn gap-2 border-none btn-ghost focus:border-none"
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
