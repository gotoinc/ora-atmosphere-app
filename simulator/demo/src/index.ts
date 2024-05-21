import { initLibrary } from './library.ts';
import { attachSimulator } from './babylon.ts';
import type { Simulator } from './scene.ts';
import { URLState } from './url_state.ts';

export async function initSimulator(root: HTMLDivElement, url: string) {
    let libraryURL = '/simulator/demo/public/library.json';

    let library = await initLibrary(libraryURL);
    let state = new URLState(library);
    let content =
        library.content.get(state.content) ||
        library.content.get(state.room.content[0])!;

    let simulator: Simulator = await attachSimulator(
        root,
        {
            URL: url,
            mediaType: content.mediaType,
            paused: true,
        },
        state.room
    );

    return { simulator };
}
