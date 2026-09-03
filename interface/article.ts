export interface Article {
    id: string;
    authorId: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    tags: string[];
    status: 'draft' | 'published' | 'archived';
    views: number;
    likes: number;
    publishedAt: Date;
    updatedAt: Date;
}