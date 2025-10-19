type Props = { title: string; href?: string; children: React.ReactNode };

export default function Section({ title, href, children }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {href ? (
          <a href={href} className="text-sm text-blue-600 hover:underline">
            Tümünü Gör
          </a>
        ) : null}
      </div>
      {children}
    </section>
  );
}
