"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function DeleteSessionButton({ id }: Props) {
  const router = useRouter();

  async function onDelete() {
    await fetch(`http://localhost:3000/session/${id}`, {
      method: "DELETE",
    });

    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      className="mt-5 inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-600 transition"
    >
      <Trash className="h-4 w-4 mr-2" />
      Delete
    </button>
  );
}
