import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed' // URL'e /tr eklemeden de çalışsın
});

export const config = {
  matcher: ['/', '/(tr|en)/:path*']
};
