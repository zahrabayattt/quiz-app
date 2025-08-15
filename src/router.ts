import { createBrowserRouter } from "react-router";
import App from "./App";
import QuizCreate from "./pages/QuizCreate";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "create-quiz",
    Component: QuizCreate,
  },
]);

export default router;
