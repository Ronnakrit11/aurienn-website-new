import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    content: string;
    excerpt: string;
    category: string;
    readingTime: number;
    author: string;
    image: string;
    keywords: string[];
}

function ensureDirectoryExists() {
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
    }
    return true;
}

function decodeSlug(slug: string): string {
    try {
        return decodeURIComponent(slug);
    } catch {
        return slug;
    }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    ensureDirectoryExists();

    try {
        const fileNames = fs.readdirSync(postsDirectory);
        const posts = fileNames
            .filter((fileName) => fileName.endsWith(".md"))
            .map((fileName) => {
                const slug = fileName.replace(/\.md$/, "");
                const fullPath = path.join(postsDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, "utf8");
                const { data, content } = matter(fileContents);

                const wordCount = content.split(/\s+/g).length;
                const readingTime = Math.ceil(wordCount / 200);

                return {
                    slug,
                    title: data.title,
                    description: data.description,
                    date: data.date,
                    content,
                    excerpt: data.excerpt || content.slice(0, 200) + "...",
                    category: data.category || "Uncategorized",
                    readingTime,
                    author: data.author || "Aurienn Team",
                    image: data.image || "/images/default-blog.svg",
                    keywords: data.keywords || [],
                };
            });

        return posts.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));
    } catch (error) {
        console.error("Error reading blog posts:", error);
        return [];
    }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    ensureDirectoryExists();

    try {
        // Decode the URL-encoded slug
        const decodedSlug = decodeSlug(slug);
        const fullPath = path.join(postsDirectory, `${decodedSlug}.md`);
        
        if (!fs.existsSync(fullPath)) {
            console.error(`Blog post not found: ${decodedSlug}`);
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        const wordCount = content.split(/\s+/g).length;
        const readingTime = Math.ceil(wordCount / 200);

        return {
            slug: decodedSlug,
            title: data.title,
            description: data.description,
            date: data.date,
            content,
            excerpt: data.excerpt || content.slice(0, 200) + "...",
            category: data.category || "Uncategorized",
            readingTime,
            author: data.author || "Aurienn Team",
            image: data.image || "/images/default-blog.svg",
            keywords: data.keywords || [],
        };
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}