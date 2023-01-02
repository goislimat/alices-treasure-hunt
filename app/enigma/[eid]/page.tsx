import Image, { StaticImageData } from "next/image";
import AnswerForm from "../../../src/forms/AnswerForm";
import enigma1 from "./assets/enigma1.png";
import enigma2 from "./assets/enigma2.png";
import enigma3 from "./assets/enigma3.png";
import enigma4 from "./assets/enigma4.png";
import enigma5 from "./assets/enigma5.png";
import enigma6 from "./assets/enigma6.png";
import enigma7 from "./assets/enigma7.png";
import enigma8 from "./assets/enigma8.png";
import enigma9 from "./assets/enigma9.png";
import enigma10 from "./assets/enigma10.png";

interface EnigmaResponse {
  questionNumber: number;
  question: string;
  answer: string;
  image: string;
}

interface EnigmaImages {
  [key: string]: StaticImageData;
}

const ENIGMAS_IMAGES: EnigmaImages = {
  enigma1,
  enigma2,
  enigma3,
  enigma4,
  enigma5,
  enigma6,
  enigma7,
  enigma8,
  enigma9,
  enigma10,
};

async function getEnigmaData(eid: string): Promise<EnigmaResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/enigma/${eid}`
  );
  const data = await res.json();
  return data;
}

interface EnigmaProps {
  params: {
    eid: string;
  };
}

export default async function Enigma({ params }: EnigmaProps) {
  const { eid } = params;
  const enigma = await getEnigmaData(eid);

  return (
    <main className="bg-purple-700 flex flex-col h-screen p-8 gap-6 justify-center">
      <h1 className="text-3xl text-yellow-500 font-bold">
        Enigma {enigma.questionNumber}
      </h1>
      <h2 className="font-bold text-lg text-white">{enigma.question}</h2>
      {enigma.image ? (
        <Image
          src={ENIGMAS_IMAGES[enigma.image]}
          alt="imagem do enigma"
          width={500}
          height={500}
          className="rounded p-6 border-2 border-white border-dashed"
        />
      ) : null}
      <AnswerForm answer={enigma.answer} enigmaId={Number(eid)} />
    </main>
  );
}
