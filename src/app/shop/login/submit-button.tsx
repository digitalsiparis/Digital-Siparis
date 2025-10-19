"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-white shadow-sm hover:bg-amber-700 disabled:opacity-60"
    >
      {pending ? children : "Giriş Yap"}
    </button>
  );
}
