import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    content: string;
    excerpt: string;
    category: string;
    readingTime: number;
}

function ensureDirectoryExists() {
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
        return false;
    }
    return true;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    if (!ensureDirectoryExists()) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            const wordCount = content.split(/\s+/g).length;
            const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute

            return {
                slug,
                title: data.title,
                date: data.date,
                content,
                excerpt: data.excerpt || content.slice(0, 200) + "...",
                category: data.category || "Uncategorized",
                readingTime,
            };
        });

    return posts.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    if (!ensureDirectoryExists()) {
        return null;
    }

    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        
        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        const wordCount = content.split(/\s+/g).length;
        const readingTime = Math.ceil(wordCount / 200);

        return {
            slug,
            title: data.title,
            date: data.date,
            content,
            excerpt: data.excerpt || content.slice(0, 200) + "...",
            category: data.category || "Uncategorized",
            readingTime,
        };
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}