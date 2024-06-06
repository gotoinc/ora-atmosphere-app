import type { Category } from '@/ts/interfaces/catalog';

export interface SearchFilters {
    categories: Category[];
    langs: string[];
    tags: string[];
}
