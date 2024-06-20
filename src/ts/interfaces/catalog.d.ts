import type { CommonCatalogTypes } from '@/ts/interfaces/common';
import type { VideoContent } from '@/ts/interfaces/contents';

export interface Category extends CommonCatalogTypes {
    groups: Group[];
}

export interface Group extends CommonCatalogTypes {
    topics: Topic[];
}

export interface Topic extends CommonCatalogTypes {
    videos: VideoContent[];
}
