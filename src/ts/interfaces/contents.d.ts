export interface VideoContent {
    id: number;
    file_url: string;
    title: string;
    description?: string;
    languages: string[];
    tags: string[];
    topic_id: number;
}
