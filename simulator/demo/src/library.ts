export type ContentKey = string;
export type Language = 'en' | 'fr';
export type ContentType = 'image' | 'video';

export interface Room {
    name: string;
    scene_glb: string;
    people_glb?: string;
    environment?: string;
    content: ContentKey[];
}

export interface Content {
    name?: string;
    mediaType: ContentType;
    // URL to equirectangular image or video
    URL: string;
    URL_fr?: string;
    // URL to thumbnail image displayed in menu
    thumbnail?: string;
    thumbnail_fr?: string;
}

export function resolveContentURL(content: Content, lang: Language): string {
    switch (lang) {
        case 'fr':
            return content.URL_fr || content.URL;
        default:
            return content.URL;
    }
}

export function resolveContentThumbnail(
    content: Content,
    lang: Language
): string {
    if (content.thumbnail === undefined) {
        return content.URL;
    }
    switch (lang) {
        case 'fr':
            return content.thumbnail_fr || content.thumbnail;
        default:
            return content.thumbnail;
    }
}

interface LibraryDefinition {
    default_room: string;
    content: Content[];
    rooms: Room[];
}

export class Library {
    default_room: string;
    default_diameter: number;
    default_lang: string;

    content: Map<ContentKey, Content>;
    rooms: Map<string, Room>;

    constructor(definition: LibraryDefinition) {
        this.default_room = definition.default_room;
        this.default_diameter = 80;
        this.default_lang = 'en';

        this.content = new Map();
        for (let content of definition.content) {
            if (!content.name) {
                console.error('Content missing name', content);
                continue;
            }
            if (!content.URL) {
                console.error('Content missing URL:', content.name);
                continue;
            }
            if (content.mediaType === 'video' && !content.thumbnail) {
                console.error('Video content missing thumbnail:', content.name);
                continue;
            }
            this.content.set(content.name, content);
        }

        this.rooms = new Map();
        for (let room of definition.rooms) {
            if (!room.name) {
                console.error('Room missing name', room);
                continue;
            }
            if (!room.scene_glb) {
                console.error('Room missing scene_glb:', room.name);
                continue;
            }
            if (!room.content) {
                console.error('Room missing content:', room.name);
                continue;
            }
            room.content = room.content.filter((key) => {
                let c = this.content.has(key);
                if (!c) {
                    console.error(
                        'Room',
                        room.name,
                        'references missing content:',
                        key
                    );
                }
                return c;
            });
            this.rooms.set(room.name, room);
        }
    }

    contentURL(key: string, lang: Language): string | undefined {
        let content = this.content.get(key);
        if (content === undefined) {
            return undefined;
        }
        return resolveContentURL(content, lang);
    }

    defaultContent(room: string): string {
        return this.rooms.get(room)?.content[0] || '';
    }
}

export async function initLibrary(libraryURL: string): Promise<Library> {
    let response = await fetch(libraryURL);
    let definition = await response.json();
    return new Library(definition);
}
