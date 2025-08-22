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

export type CreateQuizPayload = {
  title: string;
  answers: {
    text: string;
    isCorrect: boolean;
  }[];
};

export type UpdateQuizPayload = {
  title: string;
  answers: {
    id: number;
    text: string;
    isCorrect: boolean;
  }[];
};
