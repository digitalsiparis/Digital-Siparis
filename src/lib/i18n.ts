import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale})=> ({
  messages: (await import(`../messages/${locale}.json`)).default
}));

export const locales = ['tr','en'] as const;
export type Locale = typeof locales[number];