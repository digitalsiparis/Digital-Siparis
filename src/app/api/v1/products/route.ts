import {NextRequest} from 'next/server';
export async function GET(req:NextRequest){
  const url = new URL(req.url);
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/v1/products?${url.searchParams.toString()}`, {next:{revalidate:0}});
  const data = await r.json();
  return Response.json(data);
}
export async function POST(req:Request){
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/v1/products`, {method:'POST', body: await req.formData()});
  return new Response(await r.text(), {status:r.status});
}
