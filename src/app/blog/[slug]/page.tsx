import { getBlogPost } from "@/lib/blog";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";
import { notFound } from "next/navigation";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <Wrapper>
            <Container className="py-20">
                <article className="prose prose-invert mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground">
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