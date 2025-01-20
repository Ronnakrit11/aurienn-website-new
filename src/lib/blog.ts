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

function sanitizeSlug(slug: string): string {
    return slug.replace(/\.md$/, "").toLowerCase();
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    ensureDirectoryExists();

    try {
        const fileNames = fs.readdirSync(postsDirectory);
        const posts = fileNames
            .filter((fileName) => fileName.endsWith(".md"))
            .map((fileName) => {
                const slug = sanitizeSlug(fileName);
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
        // Decode and sanitize the slug
        const decodedSlug = sanitizeSlug(decodeSlug(slug));
        
        // Get all markdown files
        const files = fs.readdirSync(postsDirectory);
        
        // Find the file that matches the slug (case-insensitive)
        const fileName = files.find(file => 
            sanitizeSlug(file) === decodedSlug || 
            sanitizeSlug(file) === decodedSlug + '.md'
        );

        if (!fileName) {
            console.error(`Blog post not found: ${decodedSlug}`);
            return null;
        }

        const fullPath = path.join(postsDirectory, fileName);
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