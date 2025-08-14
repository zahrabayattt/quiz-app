import AnswerInput from "../components/AnswerInput";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import useQuizCreateForm from "../hooks/useQuizCreateForm";

export default function QuizCreate() {
  const {
    question,
    correctAnswers,
    incorrectAnswers,
    statusPublic,
    error,
    successMsg,
    isSubmitting,
    totalAnswersCount,
    setQuestion,
    setStatusPublic,
    addCorrect,
    addIncorrect,
    updateCorrect,
    updateIncorrect,
    removeCorrect,
    removeIncorrect,
    handleSubmit,
  } = useQuizCreateForm();

  return (
    <>
      <Navbar />
      <main className="bg-foreground">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <nav className="mb-6 text-sm text-foreground-tertiary">
            <a href="/" className="underline">
              Quiz Dashboard
            </a>{" "}
            &nbsp;&gt;&nbsp;{" "}
            <span className="text-border-primary">New Quiz</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr,300px]">
            <section>
              <h1 className="text-3xl font-bold text-my-primary">
                Create New QUIZ
              </h1>
              <p className="mt-1 mb-6 text-foreground-tertiary">
                Fill in the details to create a new question with at least 4
                answers.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-foreground-tertiary">
                  <label className="mb-2 block text-lg font-semibold text-background">
                    Question
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your Question Here ….."
                    rows={4}
                    className="w-full rounded-lg border border-foreground-tertiary px-4 py-3 text-background placeholder-foreground-tertiary focus:ring-2 focus:ring-violet-200 focus:outline-none"
                    aria-label="question-input"
                  />
                </div>

                <div>
                  <h2 className="mb-2 text-2xl font-semibold text-background">
                    Answers
                  </h2>
                  <p className="mb-4 text-sm text-foreground-tertiary">
                    Fill Correct Answers & Incorrect Answers.
                  </p>

                  {/* Correct box */}
                  <div className="relative mb-6 rounded-lg border p-4 shadow-card-shadow">
                    <div className="absolute top-0 bottom-0 left-0 w-2 rounded-l-md bg-my-secondary" />
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-medium text-my-primary">
                        Correct Answer
                      </h3>
                      <button
                        type="button"
                        onClick={addCorrect}
                        className="rounded border border-dashed border-foreground-tertiary px-3 py-1 text-sm text-my-primary"
                      >
                        + Add
                      </button>
                    </div>

                    <div className="space-y-3">
                      {correctAnswers.map((val, i) => (
                        <AnswerInput
                          key={`c-${i}`}
                          value={val}
                          placeholder="Enter Correct Answer"
                          onChange={(v) => updateCorrect(i, v)}
                          onRemove={
                            correctAnswers.length > 1
                              ? () => removeCorrect(i)
                              : undefined
                          }
                          index={i}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Incorrect box */}
                  <div className="relative rounded-lg border p-4 shadow-card-shadow">
                    <div className="absolute top-0 bottom-0 left-0 w-2 rounded-l-md bg-red-600" />
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-medium text-my-primary">
                        Incorrect Answer
                      </h3>
                      <button
                        type="button"
                        onClick={addIncorrect}
                        className="rounded border border-dashed border-foreground-tertiary px-3 py-1 text-sm text-my-primary"
                      >
                        + Add
                      </button>
                    </div>

                    <div className="space-y-3">
                      {incorrectAnswers.map((val, i) => (
                        <AnswerInput
                          key={`i-${i}`}
                          value={val}
                          placeholder="Enter Incorrect Answer"
                          onChange={(v) => updateIncorrect(i, v)}
                          onRemove={
                            incorrectAnswers.length > 1
                              ? () => removeIncorrect(i)
                              : undefined
                          }
                          index={i}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {error && <div className="text-error">{error}</div>}
                {successMsg && (
                  <div className="text--my-secondary">{successMsg}</div>
                )}

                <div className="flex items-center justify-end gap-4">
                  <button
                    type="button"
                    className="cursor-pointer rounded-md border border-foreground-tertiary px-5 py-2 text-border-primary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || totalAnswersCount < 4}
                    className="cursor-pointer rounded-md bg-my-primary px-5 py-2 text-foreground disabled:opacity-50"
                  >
                    {isSubmitting ? "Creating..." : "Create Quiz"}
                  </button>
                </div>
              </form>
            </section>

            {/* Right column: Status toggle & small info */}
            <aside className="hidden md:block">
              <div className="rounded-lg border border-foreground-tertiary p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-border-primary">Status</div>
                    <div className="text-xs text-foreground-tertiary">
                      Your post will be saved as a public
                    </div>
                  </div>
                  <label className="swap swap-rotate">
                    <input
                      type="checkbox"
                      checked={statusPublic}
                      onChange={() => setStatusPublic((s) => !s)}
                    />
                    <div className="swap-on btn btn-sm btn-success">On</div>
                    <div className="swap-off btn-my-secondary btn btn-sm">
                      Off
                    </div>
                  </label>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
