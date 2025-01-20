import Container from "@/components/global/container";
import { getBlogPosts } from "@/lib/blog";
import { format } from "date-fns";
import Link from "next/link";

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <Container className="py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
                <div className="space-y-8">
                    {posts.map((post) => (
                        <article key={post.slug} className="border-b border-border pb-8">
                            <Link href={`/blog/${post.slug}`}>
                                <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                            </Link>
                            <div className="flex items-center gap-4 text-muted-foreground mb-4">
                                <time dateTime={post.date}>
                                    {format(new Date(post.date), "MMMM dd, yyyy")}
                                </time>
                                <span>•</span>
                                <span>{post.readingTime} min read</span>
                                <span>•</span>
                                <span className="capitalize">{post.category}</span>
                            </div>
                            <p className="text-muted-foreground">{post.excerpt}</p>
                        </article>
                    ))}
                </div>
            </div>
        </Container>
    );
}