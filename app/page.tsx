import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-purple-700 h-screen flex flex-col justify-center p-8 gap-8">
      <h1 className="text-3xl font-bold text-center text-white">
        Bem-vindos ao maior enigma de todos os tempos
      </h1>

      <Link
        href="enigma/1"
        className="text-center bg-yellow-500 text-lg font-bold p-4 rounded"
      >
        Começar
      </Link>

      <div className="text-center text-white text-xs flex flex-col gap-2 absolute bottom-6 left-0 right-0 py-4 px-8 items-center border-1 border-red-500">
        <p>Esse é um jogo criado pela Alice.</p>
        <p>
          Todos os direitos estão reservados para a Alice Gois jogos incríveis
          de caça ao tesouro.
        </p>
      </div>
    </main>
  );
}
