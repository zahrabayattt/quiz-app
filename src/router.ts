import { createBrowserRouter } from "react-router";
import App from "./App";
import QuizCreate from "./pages/QuizCreate";
import QuizDashboard from "./pages/QuizDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "dashboard",
    Component: QuizDashboard,
  },
  {
    path: "create-quiz/:questionId?",
    Component: QuizCreate,
  },
]);

export default router;
