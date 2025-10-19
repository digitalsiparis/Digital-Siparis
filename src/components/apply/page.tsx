import ApplyForm from "@/components/partner/ApplyForm";
import { getPartnerUser } from "@/lib/partner-auth";
import { redirect } from "next/navigation";

type Props = { searchParams: { type?: "download" | "marketplace" | "market" } };

const TITLES = {
  download: "Digital İndirilebilir Başvuru",
  marketplace: "Digital Pazar Yeri Başvuru",
  market: "Digital Market Başvuru",
} as const;

export default function ApplyPage({ searchParams }: Props) {
  const user = getPartnerUser();
  if (!user) redirect("/partner/login");

  const flow = (searchParams.type ?? "marketplace") as keyof typeof TITLES;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <a href="/partner" className="rounded-lg border px-3 py-1 text-sm">← Geri</a>
        <h1 className="text-2xl font-semibold">{TITLES[flow]}</h1>
      </div>
      <ApplyForm initialFlow={flow} />
    </div>
  );
}
