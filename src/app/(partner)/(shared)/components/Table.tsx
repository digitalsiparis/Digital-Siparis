// === src/app/partner/(shared)/components/Table.tsx ===
export function SimpleTable({
head,
rows,
}: {
head: string[];
rows: (React.ReactNode[])[];
}) {
return (
<div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 bg-white">
<table className="min-w-full text-sm">
<thead className="bg-slate-50 text-slate-600">
<tr>
{head.map((h) => (
<th key={h} className="px-4 py-3 text-left font-medium">
{h}
</th>
))}
</tr>
</thead>
<tbody>
{rows.map((r, i) => (
<tr key={i} className="border-t">
{r.map((c, j) => (
<td key={j} className="px-4 py-3 align-top">
{c}
</td>
))}
</tr>
))}
</tbody>
</table>
</div>
);
}