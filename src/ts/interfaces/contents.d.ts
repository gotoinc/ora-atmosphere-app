import type { Identifiable } from '@/ts/interfaces/catalog';

export interface VideoContent {
    id: number;
    topic: Identifiable;
    file: string | null;
    image: string;
    title: string;
    description?: string;
    languages: Identifiable[];
    tags: string[];
    requires_auth: boolean;
}
