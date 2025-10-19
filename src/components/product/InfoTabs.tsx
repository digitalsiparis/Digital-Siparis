// src/components/product/InfoTabs.tsx
export default function InfoTabs({ description, attributes }: { description?: string; attributes?: Record<string, string> }) {
  const pairs = attributes && Object.keys(attributes).length
    ? attributes
    : { Materyal: "—", Renk: "—", Topuk: "—", Menşei: "—" };

  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="text-sm font-medium mb-3">Ürün Özellikleri</div>
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
        {Object.entries(pairs).map(([k, v]) => (
          <div key={k} className="rounded-lg bg-slate-50 p-2">
            <span className="font-medium">{k}: </span>
            <span className="text-slate-600">{v}</span>
          </div>
        ))}
      </div>

      {description ? (
        <div className="prose prose-slate max-w-none mt-4 text-sm">
          <p>{description}</p>
        </div>
      ) : null}
    </div>
  );
}
