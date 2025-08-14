export type AnswerModel = {
  id: number;
  answerText: string;
  isCorrect: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type QuestionModel = {
  id: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;
  answers: AnswerModel[];
};
