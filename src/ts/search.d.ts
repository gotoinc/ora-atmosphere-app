import type { Category } from '@/ts/catalog';
import type { Identifiable } from '@/ts/common';

export interface SearchFilters {
    categories: Category[];
    langs: Identifiable[];
    tags: string[];
}
