import { NextApiRequest, NextApiResponse } from "next";

const ANSWERS: Data[] = [
  {
    answerNumber: 1,
    image: "enigma1resposta",
    token: "abcde12345",
    next: 2,
  },
  {
    answerNumber: 2,
    image: "enigma2resposta",
    token: "aoeu",
  },
];

type Data = {
  answerNumber: number;
  image: string;
  token: string;
  next?: number;
};

type ErrorMessage = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorMessage>
) {
  const answerNumber = Number(req.query.aid);

  if (answerNumber > ANSWERS.length || answerNumber < 1) {
    res.status(404).json({ message: "Answer not found" });
  }

  res.status(200).json(ANSWERS[answerNumber - 1]);
}
