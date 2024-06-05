export interface VideoContent {
    id: number;
    file_url: string;
    image_url: string;
    title: string;
    description?: string;
    languages: string[];
    tags: string[];
    topic_id: number;
    requires_auth: boolean;
}
