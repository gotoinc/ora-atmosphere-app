import { initOverlay } from './overlay';
import { initLibrary, resolveContentURL } from './library';
import { attachSimulator } from '@simulator/demo';
import { URLState } from './url_state';

export async function init() {
    let root = document.getElementById('simulatorRoot')! as HTMLDivElement;

    let libraryURL = window.location.href.includes('localhost')
        ? '../simulator/demo/public/library.json'
        : 'https://akias53xj4ry2g2mrnok-coffre-s3-test.s3.eu-west-3.amazonaws.com/library.json';

    let library = await initLibrary(libraryURL);
    let state = new URLState(library);
    let content =
        library.content.get(state.content) ||
        library.content.get(state.room.content[0])!;

    let sim = await attachSimulator(
        root,
        {
            URL: resolveContentURL(content, state.lang),
            mediaType: content.mediaType,
            paused: true,
        },
        state.room
    );
    initOverlay(library, state, sim);
}
