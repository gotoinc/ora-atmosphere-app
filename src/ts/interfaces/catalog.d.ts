interface CommonCatalogTypes {
    id: number;
    name: string;
    image: string | null;
    requires_auth: boolean;
}

export interface Category extends CommonCatalogTypes {
    groups: Group[];
}

export interface Group extends CommonCatalogTypes {
    topics: Topic[];
}

export interface Topic extends CommonCatalogTypes {}

export interface Identifiable extends Pick<CommonCatalogTypes, 'id' | 'name'> {}
