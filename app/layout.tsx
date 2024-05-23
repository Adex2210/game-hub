// app/layout.tsx

/* import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomProvider from "./components/Provider";
import ReduxProviders from "./redux/Provider";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game Hub",
  description: "Generated by Game Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProviders>
          <CustomProvider>{children}</CustomProvider>
        </ReduxProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
*/




import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "./globals.css";
import CustomProvider from "./components/Provider";
import ReduxProviders from "./redux/Provider";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game Hub",
  description: "Generated by Game Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get('utm_source');
      const utmMedium = params.get('utm_medium');
      const utmCampaign = params.get('utm_campaign');
      const referrer = document.referrer;

      // Send this information to your backend
      fetch('/api/track-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referrer,
          utmSource,
          utmMedium,
          utmCampaign,
          url,
          userAgent: navigator.userAgent,
        }),
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange(window.location.href); // Track the initial load

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProviders>
          <CustomProvider>{children}</CustomProvider>
        </ReduxProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
