import { Library, Language, Room } from './library.ts';

export class URLState {
    content: string;
    room: Room;
    lang: Language;
    diameter: number;

    constructor(library: Library) {
        let url = new URL(window.location.href);
        let content = url.searchParams.get('c');
        let room = url.searchParams.get('r');
        let diameter = url.searchParams.get('d');
        let lang = url.searchParams.get('l');

        this.room =
            library.rooms.get(room || library.default_room) ||
            (library.rooms.get(library.default_room) as Room);
        this.content = content || library.defaultContent(this.room.name);
        this.diameter = diameter
            ? parseInt(diameter)
            : library.default_diameter;
        this.lang = (lang as Language) || library.default_lang;

        this.sync(library);
    }

    sync(library: Library) {
        let url = new URL(window.location.href);
        url.searchParams.delete('r');
        url.searchParams.delete('c');
        url.searchParams.delete('d');
        url.searchParams.delete('l');

        if (this.room.name !== library.default_room) {
            url.searchParams.set('r', this.room.name);
        }
        if (this.content !== library.defaultContent(this.room.name)) {
            url.searchParams.set('c', this.content);
        }
        if (this.diameter !== library.default_diameter) {
            url.searchParams.set('d', this.diameter.toString());
        }
        if (this.lang !== library.default_lang) {
            url.searchParams.set('l', this.lang);
        }

        window.history.replaceState({}, '', url.toString());
    }
}
