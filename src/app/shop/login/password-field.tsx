"use client";
import { useState, type ReactNode } from "react";

export default function PasswordField({ icon, eye, eyeOff }: { icon: ReactNode; eye: ReactNode; eyeOff: ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">Şifre</label>
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-slate-500">{icon}</span>
        <input
          name="password"
          type={show ? "text" : "password"}
          required
          minLength={6}
          placeholder="••••••"
          className="w-full rounded-xl border bg-white px-10 py-2.5 text-sm outline-none ring-1 ring-slate-200 transition focus:ring-amber-300"
          defaultValue=""
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700"
          aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}
        >
          {show ? eyeOff : eye}
        </button>
      </div>
    </div>
  );
}
