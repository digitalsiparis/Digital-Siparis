import '../globals.css';
import {getMessages, getLocale} from 'next-intl/server';
import Providers from '@/src/app/providers';
import type {Metadata} from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Digital Sipariş – Mağaza',
  description: 'Çok satıcılı pazar yeri',
  openGraph: {title:'Digital Sipariş', description:'Çok satıcılı pazar yeri'}
};

export default async function ShopLayout({children}:{children:React.ReactNode}){
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers messages={messages}>{children}</Providers>
      </body>
    </html>
  );
}
