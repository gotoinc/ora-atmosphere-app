import type { CommonCatalogTypes } from '@/ts/catalog';
import type { VideoContent } from '@/ts/contents';

export interface DetailResponse {
    detail: string;
}

export interface Identifiable extends Pick<CommonCatalogTypes, 'id' | 'name'> {}

export interface Audio {
    id: number;
    name: string;
    file: string;
    video: VideoContent;
    duration: number;
    size: number;
    language: Identifiable;
}
