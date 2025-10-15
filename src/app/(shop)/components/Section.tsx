// src/app/(shop)/components/Section.tsx
import Link from "next/link";
import type { ReactNode } from "react";

type Props = { title: string; href?: string; children: ReactNode };

export default function Section({ title, href, children }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {href ? (
          <Link href={href} className="text-sm text-blue-600 hover:underline">
            Hepsini gör
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
