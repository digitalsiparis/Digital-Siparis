"use client";
import { ReactNode } from "react";


export default function PageHeader({
title,
subtitle,
actions,
}: {
title: string;
subtitle?: string;
actions?: ReactNode;
}) {
return (
<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
<div>
<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
{subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
</div>
{actions}
</div>
);
}
