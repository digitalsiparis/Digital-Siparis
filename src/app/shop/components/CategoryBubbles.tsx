import Image from "next/image";
import Link from "next/link";

type Cat = { id: string; name: string; icon: string };

export default function CategoryBubbles({ items }: { items: Cat[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto snap-x">
      {items.map((c) => (
        <Link key={c.id} href={`/shop/category/${c.id}`} className="snap-start min-w-[92px] grid place-items-center gap-2">
          <span className="relative w-[76px] h-[76px] rounded-full ring-1 ring-slate-200 bg-white shadow-sm overflow-hidden">
            <Image src={c.icon} alt={c.name} fill sizes="76px" className="object-contain p-3" />
          </span>
          <span className="text-xs text-slate-700 text-center w-24 line-clamp-2">{c.name}</span>
        </Link>
      ))}
    </div>
  );
}
