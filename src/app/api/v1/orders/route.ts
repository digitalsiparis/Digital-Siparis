import {NextRequest} from 'next/server';
export async function GET(req:NextRequest){
  const url = new URL(req.url);
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/v1/orders?${url.searchParams.toString()}`, {next:{revalidate:0}});
  return new Response(await r.text(), {status:r.status});
}
