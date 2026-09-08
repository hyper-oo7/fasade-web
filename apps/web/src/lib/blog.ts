import blogs from '../data/blogs.json'

export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  altText?: string;
  readTime: number;
  lastUpdated: string;
  datePublished?: string;
}

export function getAllBlogs(): BlogPost[] {
  return blogs as BlogPost[];
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find(blog => blog.slug === slug) as BlogPost | undefined;
}
