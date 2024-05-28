// import { initOverlay } from './overlay';
import { initLibrary } from './library';
import { attachSimulator, Simulator } from '@simulator/demo';
import { URLState } from './url_state';

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

    // initOverlay(library, state, simulator);

    return { simulator };
}
