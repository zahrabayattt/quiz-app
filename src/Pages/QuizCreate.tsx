import React, { useState } from "react";
import AnswerInput from "../components/AnswerInput";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { createAnswer, createQuestion } from "../lib/api";

export default function QuizCreate() {
  const [question, setQuestion] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([""]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [statusPublic, setStatusPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const totalAnswersCount =
    correctAnswers.filter(Boolean).length +
    incorrectAnswers.filter(Boolean).length;

  function addCorrect() {
    setCorrectAnswers((s) => [...s, ""]);
  }
  function addIncorrect() {
    setIncorrectAnswers((s) => [...s, ""]);
  }
  function updateCorrect(i: number, v: string) {
    setCorrectAnswers((s) => s.map((it, idx) => (idx === i ? v : it)));
  }
  function updateIncorrect(i: number, v: string) {
    setIncorrectAnswers((s) => s.map((it, idx) => (idx === i ? v : it)));
  }
  function removeCorrect(i: number) {
    setCorrectAnswers((s) => s.filter((_, idx) => idx !== i));
  }
  function removeIncorrect(i: number) {
    setIncorrectAnswers((s) => s.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // validation
    if (!question.trim()) {
      setError("Please Enter The Questions");
      return;
    }
    const filledCorrect = correctAnswers.filter((s) => s.trim());
    const filledIncorrect = incorrectAnswers.filter((s) => s.trim());
    if (filledCorrect.length + filledIncorrect.length < 4) {
      setError("At Least 4 Incorrect Answer Needed");
      return;
    }
    if (filledCorrect.length < 1) {
      setError("At Least 1 Correct Answer Needed");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1) create question
      const qPayload = { title: question };
      const qResp = await createQuestion(qPayload);
   
      const questionId = qResp?.id ?? qResp?.data?.id ?? qResp?.questionId;
      if (!questionId) {
        console.warn(
          "The server response did not return a question ID",
          qResp,
        );
      }

      // 2) create answers
      const answersToSend = [
        ...filledCorrect.map((t) => ({ text: t, isCorrect: true })),
        ...filledIncorrect.map((t) => ({ text: t, isCorrect: false })),
      ];

      //questionId
      await Promise.all(
        answersToSend.map((ans) =>
          createAnswer({
            questionId: questionId ?? "",
            text: ans.text,
            isCorrect: ans.isCorrect,
          }),
        ),
      );

      setSuccessMsg("Question Created Successfully");
     //reset form
      setQuestion("");
      setCorrectAnswers([""]);
      setIncorrectAnswers(["", "", ""]);
    } catch (err: any) {
      console.error(err);
      setError("There was a problem creating the question. Please try again later");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <nav className="mb-6 text-sm text-gray-500">
            <a href="#" className="underline">
              Quiz Dashboard
            </a>{" "}
            &nbsp;&gt;&nbsp; <span className="text-gray-700">New Quiz</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr,300px]">
            <section>
              <h1 className="text-3xl font-bold text-violet-600">
                Create New QUIZ
              </h1>
              <p className="mt-1 mb-6 text-gray-400">
                Fill in the details to create a new question with at least 4
                answers.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-lg font-semibold text-background">
                    Question
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your Question Here ….."
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-violet-200 focus:outline-none text-background"
                    aria-label="question-input"
                  />
                </div>

                <div>
                  <h2 className="mb-2 text-2xl font-semibold text-background">Answers</h2>
                  <p className="mb-4 text-sm text-gray-400">
                    Fill Correct Answers & Incorrect Answers.
                  </p>

                  {/* Correct box */}
                  <div className="relative mb-6 rounded-lg border border-gray-200 p-4">
                    <div className="absolute top-0 bottom-0 left-0 w-2 rounded-l-md bg-green-500" />
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-medium text-violet-600">
                        Correct Answer
                      </h3>
                      <button
                        type="button"
                        onClick={addCorrect}
                        className="rounded border border-dashed border-violet-300 px-3 py-1 text-sm text-violet-600"
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
                  <div className="relative rounded-lg border border-gray-200 p-4">
                    <div className="absolute top-0 bottom-0 left-0 w-2 rounded-l-md bg-red-600" />
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-medium text-violet-600">
                        Incorrect Answer
                      </h3>
                      <button
                        type="button"
                        onClick={addIncorrect}
                        className="rounded border border-dashed border-violet-300 px-3 py-1 text-sm text-violet-600"
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

                {error && <div className="text-red-600">{error}</div>}
                {successMsg && (
                  <div className="text-green-600">{successMsg}</div>
                )}

                <div className="flex items-center justify-end gap-4">
                  <button
                    type="button"
                    className="rounded-md border border-gray-200 px-5 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || totalAnswersCount < 4}
                    className="rounded-md bg-violet-600 px-5 py-2 text-white disabled:opacity-50"
                  >
                    {isSubmitting ? "Creating..." : "Create Quiz"}
                  </button>
                </div>
              </form>
            </section>

            {/* Right column: Status toggle & small info */}
            <aside className="hidden md:block">
              <div className="rounded-lg border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="text-xs text-gray-400">
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
                    <div className="swap-off btn btn-ghost btn-sm">Off</div>
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
