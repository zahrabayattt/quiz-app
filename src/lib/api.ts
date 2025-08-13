import axios from "axios";

const api = axios.create({
  baseURL: "https://crudify.dev/api/v1",
  headers: {
    //Need to implement after api Registration,
  },
  timeout: 10000,
});

export type CreateQuestionPayload = {
  title: string;
};

export type CreateAnswerPayload = {
  questionId: string | number;
  text: string;
  isCorrect: boolean;
};

export async function createQuestion(payload: CreateQuestionPayload) {
  // POST /quizzes/questions
  const resp = await api.post("/quizzes/questions", payload);
  return resp.data;
}

export async function createAnswer(payload: CreateAnswerPayload) {
  // POST /quizzes/answers
  const resp = await api.post("/quizzes/answers", payload);
  return resp.data;
}

export async function getAllQuestions() {
  const resp = await api.get("/quizzes/questions");
  return resp.data;
}

export default api;
