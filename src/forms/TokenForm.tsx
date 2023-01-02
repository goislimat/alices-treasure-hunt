"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  token: string;
  next?: number;
}

interface Inputs {
  token: string;
}

export default function TokenForm({ token, next }: Props) {
  const [wrongCode, setWrongCode] = useState(false);

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const router = useRouter();

  function onSubmit(data: Inputs) {
    reset();
    if (data.token.toLowerCase() === token.toLowerCase()) {
      if (next) {
        router.push(`/enigma/${next}`);
      } else {
        router.push("/congratulations");
      }
    } else {
      setWrongCode(true);
      setTimeout(() => {
        setWrongCode(false);
      }, 3000);
    }
  }

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 grid-cols-4"
      >
        <input
          type="text"
          placeholder="Código secreto"
          {...register("token")}
          className="col-span-3 p-3 rounded"
        />
        <button type="submit" className="bg-yellow-500 rounded">
          <i className="fa-solid fa-lock"></i>
        </button>
      </form>

      {wrongCode ? (
        <div className="absolute text-red-800 bg-white rounded top-8 left-8 right-8 p-6 shadow shadow-gray-500">
          <span className="block text-center font-bold text-lg">
            Código errado!!
          </span>
        </div>
      ) : null}
    </>
  );
}
