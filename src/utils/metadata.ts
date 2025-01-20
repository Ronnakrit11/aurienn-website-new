import { Metadata } from "next";

interface MetadataProps {
    title?: string;
    description?: string;
    icons?: Metadata["icons"];
    noIndex?: boolean;
    keywords?: string[];
    author?: string;
    twitterHandle?: string;
    type?: "website" | "article" | "profile";
    locale?: string;
    alternates?: Record<string, string>;
    publishedTime?: string;
    modifiedTime?: string;
}

export const generateMetadata = ({
    title = `Aurienn บริการทำระบบซื้อขายทอง ระบบออมทองให้ร้านทองของคุณ`,
    description = `เปลี่ยนร้านทองของคุณ, ด้วยระบบซื้อขายทอง ระบบออมทอง 24 ชม`,
    icons = [
        {
            rel: "icon",
            url: "/icons/Ar-logo.png",
            media: "(prefers-color-scheme: light)",
        },
        {
            rel: "icon",
            url: "/icons/Ar-logo.png",
            media: "(prefers-color-scheme: dark)",
        },
    ],
    noIndex = false,
    keywords = [
        "ระบบออมทอง",
        "ระบบซื้อขายทองออนไลน์",
        "ระบบออมทองอัตโนมัติ",
        "ระบบบริหารร้านทอง",
        "multilingual marketing",
        "Gold Trading",
        "marketing workflow",
    ],
    author = process.env.NEXT_PUBLIC_AUTHOR_NAME,
    type = "website",
}: MetadataProps = {}): Metadata => {
    const metadataBase = new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.aurienn.com");

    return {
        metadataBase,
        title: {
            template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
            default: title
        },
        description,
        keywords,
        authors: [{ name: author }],
        creator: author,
        publisher: process.env.NEXT_PUBLIC_APP_NAME,
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
            },
        },
        openGraph: {
            type,
            title,
            description,
            siteName: process.env.NEXT_PUBLIC_APP_NAME,
            url: metadataBase,
            images: [
                {
                    url: "/images/dashboard_Aurienn.png",
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/dashboard_Aurienn.png"],
        },
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons,
        alternates: {
            canonical: metadataBase.toString(),
        },
    };
};