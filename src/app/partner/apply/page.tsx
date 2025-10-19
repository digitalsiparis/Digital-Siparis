import ApplyForm from "@/components/partner/ApplyForm";

type Props = {
  searchParams: { type?: "download" | "marketplace" | "market" };
};

const TITLES = {
  download: "Digital İndirilebilir Başvuru",
  marketplace: "Digital Pazar Yeri Başvuru",
  market: "Digital Market Başvuru",
};

export default function ApplyPage({ searchParams }: Props) {
  const flow = searchParams.type ?? "marketplace";
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <a href="/partner" className="rounded-lg border px-3 py-1 text-sm">← Geri</a>
        <h1 className="text-2xl font-semibold">
          {TITLES[flow as keyof typeof TITLES]}
        </h1>
      </div>
      <ApplyForm initialFlow={flow as any} />
    </div>
  );
}
