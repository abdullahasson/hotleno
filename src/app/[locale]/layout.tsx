// Next js
import type { Metadata } from "next";
import Script from 'next/script';
// Google Fonts
import { Cairo, Roboto } from "next/font/google";
// Next Intl
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
// Components
import Footer from "@/components/common/footer";
// Styles
import "../globals.css";


export const metadata: Metadata = {
  title: "هوتلينو",
  description: "Generated by Abdullah hasson",
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const cairo = Cairo({
  weight: '400',
  subsets: ['arabic']
})

// Define the valid locales as a type
type ValidLocale = "en" | "ar" | "fr" | "es" | "tr";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as ValidLocale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-theme='dark'
      className={`${roboto.className} ${cairo.className}`}
    >
      <head>
        <Script
          id="external-script-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.async = true;
                script.src = 'https://emrldtp.com/NDI2NTc5.js?t=426579';
                document.head.appendChild(script);
              })();
            `,
          }}
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
        />
      </head>
      <body
        dir={locale == "ar" ? "rtl" : "ltr"}
        className={`antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <>
            {children}
            <Footer />
            {/* <Contact /> */}
          </>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}