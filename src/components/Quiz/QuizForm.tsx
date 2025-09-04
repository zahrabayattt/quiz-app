import { useNavigate } from "react-router";
import { type QuestionModel } from "../../@types/quiz.model";
import LayoutContainer from "../../components/Layout/LayoutContainer";
import useQuizCreateForm from "../../hooks/useQuizCreateForm";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
import AnswerInput from "./AnswerInput";
import StatusToggle from "./StatusToggle";

interface IQuizForm {
  mode: "create" | "edit";
  initialData?: QuestionModel;
}

const QuizForm = ({ mode, initialData }: IQuizForm) => {
  const form = useQuizCreateForm(initialData);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-foreground pb-20">
        <LayoutContainer>
          <div className="flex items-end justify-between md:hidden">
            <h1 className="mt-3 inline-block self-start text-[18px] font-bold text-my-primary">
              {mode === "create" ? "Create New QUIZ" : "Edit QUIZ"}
            </h1>
            <div className="flex flex-col">
              <div className="mt-3 flex items-center justify-end gap-2">
                <span className="text-sm">Status</span>
                <StatusToggle
                  checked={form.statusPublic}
                  onChange={(n) => form.setStatusPublic(() => n)}
                />
              </div>
              <div className="mt-1 text-right text-[8px] text-foreground-tertiary">
                Your post will be saved as a public
              </div>
            </div>
          </div>
          <div className="hidden items-center justify-between gap-4 py-6 md:flex">
            <nav className="text-sm text-foreground-tertiary">
              <a href="/" className="underline">
                Quiz Dashboard
              </a>{" "}
              &nbsp;&gt;&nbsp;{" "}
              <span className="">
                {mode === "create" ? "New Quiz" : "Edit Quiz"}
              </span>
            </nav>

            <aside className="shrink-0">
              <div className="flex items-center justify-end gap-3">
                <span className="text-sm">Status</span>
                <StatusToggle
                  checked={form.statusPublic}
                  onChange={(n) => form.setStatusPublic(() => n)}
                />
              </div>
              <div className="mt-1 text-right text-xs text-foreground-tertiary">
                Your post will be saved as a public
              </div>
            </aside>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr,300px]">
            <section>
              <h1 className="mb-5 hidden font-bold text-my-primary md:block md:text-4xl">
                {mode === "create" ? "Create New QUIZ" : "Edit QUIZ"}
              </h1>

              <p className="mt-[-10px] mb-6 text-[10px] text-foreground-tertiary md:mt-1 md:text-sm">
                {mode === "create" ? (
                  <div className="mt-3 flex flex-col md:block">
                    <span>Fill in the details to create a new </span>{" "}
                    <span>question with at least 4 answers.</span>
                  </div>
                ) : (
                  <div className="flex flex-col md:block">
                    <span>Update the details of your </span>{" "}
                    <span>quiz question and answers.</span>
                  </div>
                )}
              </p>

              <form onSubmit={form.handleSubmit} className="space-y-6">
                <div className="border-foreground-tertiary">
                  <label className="mb-2 block text-lg font-semibold text-background">
                    Question
                  </label>
                  <textarea
                    value={form.question}
                    onChange={(e) => form.setQuestion(e.target.value)}
                    placeholder="Enter your Question Here ….."
                    rows={4}
                    className="w-full rounded-lg border border-foreground-tertiary px-4 py-3 text-background placeholder-foreground-tertiary focus:ring-2 focus:ring-violet-200 focus:outline-none"
                    aria-label="question-input"
                  />
                </div>

                <div>
                  <h2 className="mb-2 font-semibold text-background md:text-2xl">
                    Answers
                  </h2>
                  <p className="mb-4 text-sm text-foreground-tertiary">
                    Fill Correct Answers & Incorrect Answers.
                  </p>

                  <div className="relative mb-6 rounded-lg border p-4 shadow-card-shadow">
                    <div className="absolute top-0 bottom-0 left-0 w-2 rounded-l-md bg-my-secondary" />
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-medium text-my-primary">
                        Correct Answer
                      </h3>
                      <button
                        type="button"
                        onClick={form.addCorrect}
                        className="rounded border border-dashed border-foreground-tertiary px-3 py-1 text-sm text-my-primary"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-3">
                      {form.correctAnswers.map((val, i) => (
                        <AnswerInput
                          key={`c-${i}`}
                          value={val}
                          placeholder="Enter Correct Answer"
                          onChange={(v) => form.updateCorrect(i, v)}
                          onRemove={() => form.removeCorrect(i)}
                          index={i}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative rounded-lg border p-4 shadow-card-shadow">
                    <div className="absolute top-0 bottom-0 left-0 w-2 rounded-l-md bg-red-600" />
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-medium text-my-primary">
                        Incorrect Answer
                      </h3>
                      <button
                        type="button"
                        onClick={form.addIncorrect}
                        className="rounded border border-dashed border-foreground-tertiary px-3 py-1 text-sm text-my-primary"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-3">
                      {form.incorrectAnswers.map((val, i) => (
                        <AnswerInput
                          key={`i-${i}`}
                          value={val}
                          placeholder="Enter Incorrect Answer"
                          onChange={(v) => form.updateIncorrect(i, v)}
                          onRemove={() => form.removeIncorrect(i)}
                          index={i}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {form.error && <div className="text-error">{form.error}</div>}
                {form.successMsg && (
                  <div className="text--my-secondary">{form.successMsg}</div>
                )}

                <div className="flex items-center justify-end gap-4 pb-8">
                  <button
                    type="button"
                    className="cursor-pointer rounded-md border border-foreground-tertiary px-5 py-2 text-border-primary"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={form.isSubmitting || form.totalAnswersCount < 2}
                    className="cursor-pointer rounded-md bg-my-primary px-5 py-2 text-white disabled:opacity-50"
                  >
                    {form.isSubmitting
                      ? mode === "create"
                        ? "Creating..."
                        : "Updating..."
                      : mode === "create"
                        ? "Create Quiz"
                        : "Update Quiz"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </LayoutContainer>
        <Footer />
      </main>
    </>
  );
};

export default QuizForm;
