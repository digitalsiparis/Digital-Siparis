'use client';
import {ThemeProvider} from 'next-themes';
import {NextIntlClientProvider} from 'next-intl';
import {useLocale} from 'next-intl';
import React from 'react';

export default function Providers({children, messages}:{children:React.ReactNode; messages:any}){
  const locale = useLocale();
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
