import "@/styles/globals.css";
import { cn } from "@/lib";
import { generateMetadata } from "@/utils";
import { base, heading } from "@/constants";
import { Toaster } from "@/components/ui/sonner";
import { subheading } from "@/constants/fonts";
import { Metadata } from "next";



export const metadata: Metadata = {
    metadataBase: new URL("https://www.Aurienn-9.com"),
    title: {
      default: 'Aurienn บริการทำระบบซื้อขายทอง ระบบออมทองให้ร้านทองของคุณ',
      template: `%s | Aurienn`
    },
    description: 'เปลี่ยนร้านทองของคุณ, ด้วยระบบซื้อขายทอง ระบบออมทอง 24 ชม.',
    openGraph: {
      description: 'เปลี่ยนร้านทองของคุณ, ด้วยระบบซื้อขายทอง ระบบออมทอง 24 ชม.',
      images: ['https://1qiwmugjmx.ufs.sh/f/JJLy8gppTqPnYt6unvQNAxnzvKiHT4fUXPyC8l1t9ZVQSpMr'],
      url: 'https://www.Aurienn.com'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Aurienn บริการทำระบบซื้อขายทอง ระบบออมทองให้ร้านทองของคุณ',
      description: 'เปลี่ยนร้านทองของคุณ, ด้วยระบบซื้อขายทอง ระบบออมทอง 24 ชม.',
      siteId: "",
      creator: "@Expert8-solution",
      creatorId: "",
      images: ['https://1qiwmugjmx.ufs.sh/f/JJLy8gppTqPnYt6unvQNAxnzvKiHT4fUXPyC8l1t9ZVQSpMr'],
    },
  }

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased font-heading overflow-x-hidden !scrollbar-hide",
                    base.variable,
                    heading.variable,
                    subheading.variable,
                )}
            >
                    <Toaster richColors theme="dark" position="top-right" />
                    {children}
            </body>
        </html>
    );
};