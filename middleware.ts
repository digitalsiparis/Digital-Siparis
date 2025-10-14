// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Domain -> Route group eşleşmesi
const DOMAIN_TO_GROUP: Record<string, string> = {
  'shop.digitalsiparis.com': '(shop)',
  'partner.digitalsiparis.com': '(partner)',

  // Geliştirme / önizleme
  'localhost:3000': '(shop)',                 // localde shop varsayılan
  // 'digitalsiparis.vercel.app': '(shop)',   // preview domaininizi ekleyebilirsiniz
  // 'partner-...vercel.app': '(partner)',     // isterseniz özel preview ayırımı
  // İLERİDE: ana domaini shop'a yönlendirmek için:
  'digitalsiparis.com': '(shop)',
  'www.digitalsiparis.com': '(shop)',
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const host = req.headers.get('host') || ''

  // Next statik dosyalar vs.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/assets')
  ) {
    return NextResponse.next()
  }

  const group = DOMAIN_TO_GROUP[host]
  if (!group) {
    // Bilinmeyen host gelirse varsayılanı shop yapalım
    return NextResponse.rewrite(new URL(`/(shop)${pathname}`, req.url))
  }

  // Zaten doğru grupta ise aynen devam
  if (pathname.startsWith(`/${group}`)) {
    return NextResponse.next()
  }

  // Aksi halde doğru gruba rewrite
  return NextResponse.rewrite(new URL(`/${group}${pathname}`, req.url))
}

export const config = {
  matcher: [
    '/((?!_next|.*\\..*|api).*)', // statik ve api hariç tüm yollar
  ],
}
