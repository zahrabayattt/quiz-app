import { createBrowserRouter } from "react-router";
import App from "./App";
import QuizCreate from "./pages/QuizCreate";
import QuizDashboard from "./pages/QuizDashboard";
import QuizEdit from "./pages/QuizEdit";

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
    path: "create-quiz",
    Component: QuizCreate,
  },
  {
    path: "edit-quiz/:questionId?",
    Component: QuizEdit,
  },
]);

export default router;
