import type { Topic } from '@/ts/interfaces/catalog';

export interface VideoContent {
    id: number;
    topic: Topic;
    file_url: string;
    image_url: string;
    title: string;
    description?: string;
    languages: string[];
    tags: string[];
    requires_auth: boolean;
}
