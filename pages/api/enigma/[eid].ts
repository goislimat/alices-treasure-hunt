import type { NextApiRequest, NextApiResponse } from "next";

const QUESTIONS: Data[] = [
  {
    questionNumber: 1,
    question: "Qual o ditado popular escondido nesta imagem?",
    image: "enigma1",
    answer: "Boca fechada não entra mosquito",
  },
  {
    questionNumber: 2,
    question: "Quanto é 2 + 2?",
    answer: "4",
  },
];

type Data = {
  questionNumber: number;
  question: string;
  image?: string;
  answer: string;
};

type ErrorMessage = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorMessage>
) {
  const questionNumber = Number(req.query.eid);

  if (questionNumber > QUESTIONS.length || questionNumber < 1) {
    res.status(404).json({ message: "Question not found" });
  }

  res.status(200).json(QUESTIONS[questionNumber - 1]);
}
