import Image, { StaticImageData } from "next/image";
import TokenForm from "../../../../src/forms/TokenForm";
import enigma1resposta from "../assets/enigma1resposta.png";
import enigma2resposta from "../assets/enigma2resposta.png";
import enigma3resposta from "../assets/enigma3resposta.png";
import enigma4resposta from "../assets/enigma4resposta.png";
import enigma5resposta from "../assets/enigma5resposta.png";
import enigma6resposta from "../assets/enigma6resposta.png";
import enigma7resposta from "../assets/enigma7resposta.png";
import enigma8resposta from "../assets/enigma8resposta.png";
import enigma9resposta from "../assets/enigma9resposta.png";
import enigma10resposta from "../assets/enigma10resposta.png";

interface AnswerResponse {
  image: string;
  token: string;
  next?: number;
}

async function getEnigmaAnswer(eid: string): Promise<AnswerResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/answer/${eid}`
  );
  const data = await response.json();
  return data;
}

interface EnigmaImages {
  [key: string]: StaticImageData;
}

const ENIGMAS_ANSWERS_IMAGES: EnigmaImages = {
  enigma1resposta,
  enigma2resposta,
  enigma3resposta,
  enigma4resposta,
  enigma5resposta,
  enigma6resposta,
  enigma7resposta,
  enigma8resposta,
  enigma9resposta,
  enigma10resposta,
};

interface EnigmaProps {
  params: {
    eid: string;
  };
}

export default async function EnigmaAnswer({ params }: EnigmaProps) {
  const { eid } = params;
  const answer = await getEnigmaAnswer(eid);

  return (
    <main className="bg-purple-700 flex flex-col h-screen p-8 gap-6 justify-center">
      <h1 className="text-3xl text-yellow-500 font-bold">
        O código secreto está aqui
      </h1>
      <Image
        src={ENIGMAS_ANSWERS_IMAGES[answer.image]}
        alt="dica de onde se encontra o código do enigma"
        width={500}
        height={500}
        className="rounded p-6 border-2 border-white border-dashed"
      />
      <TokenForm token={answer.token} next={answer.next} />
    </main>
  );
}
