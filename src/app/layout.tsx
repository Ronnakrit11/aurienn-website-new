import "@/styles/globals.css";
import { cn } from "@/lib";
import { generateMetadata } from "@/utils";
import { base, heading, prompt, thai } from "@/constants";
import { Toaster } from "@/components/ui/sonner";

export const metadata = generateMetadata();
({
    noIndex: true,
    noFollow: true
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased overflow-x-hidden !scrollbar-hide",
                    base.variable,
                    heading.variable,
                    prompt.variable,
                    thai.variable,
                )}
            >
                <Toaster richColors theme="dark" position="top-right" />
                {children}
            </body>
        </html>
    );
};