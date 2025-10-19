import Image from "next/image";

type Brand = { id: string; logo: string };

export default function BrandsRow({ items }: { items: Brand[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto snap-x">
      {items.map((b) => (
        <div key={b.id} className="snap-start min-w-[120px] h-[68px] rounded-xl ring-1 ring-slate-200 bg-white grid place-items-center p-2">
          <div className="relative w-[100px] h-[36px]">
            <Image src={b.logo} alt={b.id} fill sizes="100px" className="object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}
