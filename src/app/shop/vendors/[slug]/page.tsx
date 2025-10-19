export default function VendorDetail({params}:{params:{slug:string}}){
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Marka: {params.slug}</h1>
      <p className="text-slate-600 text-sm">Bu marka için vitrin yakında.</p>
    </section>
  );
}
