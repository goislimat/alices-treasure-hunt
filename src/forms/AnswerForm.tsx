"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../modal/Modal";
import gifs from "../gifs";

interface Inputs {
  answer: string;
}

interface AnswerFormProps {
  answer: string;
  enigmaId: number;
}

export default function AnswerForm({ answer, enigmaId }: AnswerFormProps) {
  const [answersList, setAnswersList] = useState<
    { answer: string; almostRight: boolean }[]
  >([]);
  const [isRightAnswerModalOpen, setIsRightAnswerModalOpen] = useState(false);
  const [isAnswersListModalOpen, setIsAnswersListModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const router = useRouter();

  function openRightAnswerModal() {
    setIsRightAnswerModalOpen(true);
    setTimeout(() => {
      router.push(`/enigma/${enigmaId}/answer`);
    }, 5000);
  }

  function openAnswersListModal() {
    setIsAnswersListModalOpen(true);
  }

  function closeAnswersListModal() {
    setIsAnswersListModalOpen(false);
  }

  function getGif() {
    return gifs[Math.floor(Math.random() * gifs.length)];
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    reset();

    if (data.answer.toLowerCase() === answer.toLowerCase()) {
      openRightAnswerModal();
      return;
    }
    const correctAnswerWords = answer.toLowerCase().split(" ");
    const userAnswerWords = data.answer.toLowerCase().split(" ");

    const correctWords = correctAnswerWords.filter((word) =>
      userAnswerWords.includes(word)
    );

    if (correctWords.length > correctAnswerWords.length * 0.5) {
      if (!answersList.some((answer) => answer.answer === data.answer)) {
        setAnswersList([
          { answer: data.answer, almostRight: true },
          ...answersList,
        ]);
      }

      return;
    }

    if (!answersList.some((answer) => answer.answer === data.answer)) {
      setAnswersList([
        { answer: data.answer, almostRight: false },
        ...answersList,
      ]);
    }
  };

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 grid-cols-4"
      >
        <input
          type="text"
          placeholder="Resposta"
          {...register("answer")}
          className="col-span-3 p-3 rounded"
        />

        <button type="submit" className="bg-yellow-500 rounded">
          <i className="fa-solid fa-arrow-right"></i>
        </button>

        {answersList.length > 0 ? (
          <>
            <span className="col-span-3 text-yellow-500 font-bold">
              {answersList[0].answer}
            </span>
            <span className="text-yellow-500 font-bold">
              {answersList[0].almostRight ? "Quase" : "Errado"}
            </span>
          </>
        ) : null}
      </form>

      <button
        className="absolute bottom-8 right-8 bg-white w-12 h-12 rounded-full"
        onClick={openAnswersListModal}
      >
        <i className="fa-solid fa-list"></i>
      </button>

      <Modal isOpen={isAnswersListModalOpen} onClose={closeAnswersListModal}>
        <div className="z-20 bg-white p-8 h-[500px] overflow-y-auto flex flex-col justify-center w-[90vw] gap-4">
          {answersList.length > 0 ? (
            <>
              <h3 className="text-xl font-bold">Todas as suas respostas</h3>
              <ul>
                {answersList.map(({ answer, almostRight }) => (
                  <li
                    key={answer}
                    className={`${
                      almostRight ? "text-yellow-500" : "text-red-500"
                    } font-bold`}
                  >
                    {almostRight ? "Quase" : "Errado"} - {answer}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h3 className="text-xl font-bold">
              Nenhuma resposta dada ainda :(
            </h3>
          )}
        </div>
      </Modal>

      <Modal isOpen={isRightAnswerModalOpen}>
        <h3 className="z-20 text-white text-3xl p-8">
          Parabéns, você acertou!
        </h3>
        <Image
          src={getGif()}
          className="z-20"
          alt="gif"
          width={300}
          height={300}
        />
      </Modal>
    </>
  );
}
