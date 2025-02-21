import { initLibrary } from './library.ts';
import { attachSimulator } from './babylon.ts';
import type { Simulator } from './scene.ts';
import { URLState } from './url_state.ts';

export async function initSimulator(
    root: HTMLDivElement,
    url: string,
    mediaType: 'video' | 'image' = 'video',
    video?: HTMLVideoElement
) {
    let libraryURL = window.location.href.includes('localhost')
        ? '/public/simulator/library.json'
        : '/simulator/library.json';

    let library = await initLibrary(libraryURL);
    let state = new URLState(library);

    let simulator: Simulator = await attachSimulator(
        root,
        {
            URL: url,
            paused: true,
            mediaType,
        },
        video,
        state.room
    );

    return { simulator };
}
