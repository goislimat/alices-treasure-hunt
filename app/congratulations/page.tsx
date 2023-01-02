interface CongratulationsResponse {
  secret: string;
}

async function getCongratulationsCode(): Promise<CongratulationsResponse> {
  const res = await fetch(`${process.env.HOSTNAME}/api/congratulations`);
  const data = await res.json();
  return data;
}
export default async function Congratulations() {
  const { secret } = await getCongratulationsCode();

  return (
    <main className="bg-purple-700 flex flex-col h-screen p-8 gap-6 justify-center">
      <h1 className="text-3xl font-bold text-center text-yellow-500">
        Parabéns, você chegou ao fim do jogo!
      </h1>

      <p className="text-lg text-white">
        Diga a palavra passe para o mestre e ganhe seu prêmio.
      </p>

      <span className="block text-center text-yellow-500 border-2 border-dashed border-white uppercase font-bold text-3xl p-4 rounded">
        {secret}
      </span>
    </main>
  );
}
