export interface Category {
    id: number;
    name: string;
    image_url: string;
}

export interface Group {
    id: number;
    name: string;
    image_url: string;
    category_id: number;
}

export interface Topic {
    id: number;
    name: string;
    image_url: string;
    group_id: number;
}

export interface Catalog {
    category: string;
    groups: Group[];
}
