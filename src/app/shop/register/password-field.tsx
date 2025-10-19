"use client";
import { useState, type ReactNode } from "react";

export default function PasswordField({ eye, eyeOff }: { eye: ReactNode; eyeOff: ReactNode }) {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <div className="grid gap-3">
      <div>
        <label className="mb-1 block text-sm font-medium">Şifre</label>
        <div className="relative">
          <input
            name="password"
            type={show1 ? "text" : "password"}
            required
            minLength={6}
            placeholder="••••••"
            className="w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none ring-1 ring-slate-200 focus:ring-amber-300"
          />
          <button
            type="button"
            onClick={() => setShow1((s) => !s)}
            className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700"
            aria-label={show1 ? "Şifreyi gizle" : "Şifreyi göster"}
          >
            {show1 ? eyeOff : eye}
          </button>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Şifre (tekrar)</label>
        <div className="relative">
          <input
            name="password2"
            type={show2 ? "text" : "password"}
            required
            minLength={6}
            placeholder="••••••"
            className="w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none ring-1 ring-slate-200 focus:ring-amber-300"
          />
          <button
            type="button"
            onClick={() => setShow2((s) => !s)}
            className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700"
            aria-label={show2 ? "Şifreyi gizle" : "Şifreyi göster"}
          >
            {show2 ? eyeOff : eye}
          </button>
        </div>
      </div>
    </div>
  );
}
