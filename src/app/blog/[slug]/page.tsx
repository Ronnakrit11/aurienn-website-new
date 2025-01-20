import { getBlogPost } from "@/lib/blog";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";
import { notFound } from "next/navigation";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { Metadata } from "next";
import Image from "next/image";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = await getBlogPost(decodeURIComponent(params.slug));

    if (!post) {
        return {
            title: "Blog Post Not Found",
            description: "The requested blog post could not be found.",
        };
    }

    return {
        title: post.title,
        description: post.description,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            images: [post.image],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [post.image],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getBlogPost(decodeURIComponent(params.slug));

    if (!post) {
        notFound();
    }

    return (
        <Wrapper>
            <Container className="py-20">
                <article className="prose prose-invert mx-auto">
                    <div className="mb-8">
                        <div className="relative w-full aspect-[2/1] mb-8 rounded-xl overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <span>{post.author}</span>
                            <span>•</span>
                            <time dateTime={post.date}>
                                {format(new Date(post.date), "MMMM dd, yyyy")}
                            </time>
                            <span>•</span>
                            <span>{post.readingTime} min read</span>
                            <span>•</span>
                            <span className="capitalize">{post.category}</span>
                        </div>
                    </div>
                    <Markdown className="prose prose-invert max-w-none">
                        {post.content}
                    </Markdown>
                </article>
            </Container>
        </Wrapper>
    );
}