import {
    Content,
    Library,
    resolveContentThumbnail,
    resolveContentURL,
} from './library';
import { Simulator } from '@simulator/demo';
import { URLState } from './url_state';

export function initOverlay(
    library: Library,
    state: URLState,
    scene: Simulator
) {
    // document
    //     .getElementById('settings-people-visible')!
    //     .addEventListener('click', () => {
    //         scene.peopleVisible = true;
    //     });

    let button60 = document.getElementById('sphere-button-60')!;
    let button80 = document.getElementById('sphere-button-80')!;
    let button100 = document.getElementById('sphere-button-100')!;
    function resetActive() {
        button60.classList.remove('sphere-button-active');
        button80.classList.remove('sphere-button-active');
        button100.classList.remove('sphere-button-active');
    }

    button60.onclick = () => {
        scene.setDiameter(60);
        resetActive();
        button60.classList.add('sphere-button-active');
    };
    button80.onclick = () => {
        scene.setDiameter(80);
        resetActive();
        button80.classList.add('sphere-button-active');
    };
    button100.onclick = () => {
        scene.setDiameter(100);
        resetActive();
        button100.classList.add('sphere-button-active');
    };

    switch (state.diameter) {
        case 60:
            button60.click();
            break;
        case 80:
            button80.click();
            break;
        case 100:
            button100.click();
            break;
        default:
            button80.click();
    }

    let setContent = (content: Content) => {
        scene.setContent({
            URL: resolveContentURL(content, state.lang),
            mediaType: content.mediaType,
        });
        if (content.name) {
            state.content = content.name;
            state.sync(library);
        }
    };

    let contentBar = document.getElementById('content-bar');
    if (!contentBar) {
        return;
    }
    for (let img_ref of state.room.content) {
        let content = library.content.get(img_ref);
        if (content === undefined) {
            continue;
        }
        let url = resolveContentThumbnail(content, state.lang);

        let overlayContainer = document.createElement('div');
        overlayContainer.className = 'overlay-content';
        overlayContainer.draggable = true;

        if (content.name === state.content) {
            setActive(overlayContainer);
        }

        overlayContainer.addEventListener('click', () => {
            if (content) {
                setContent(content);
                setActive(overlayContainer);
            }
        });
        overlayContainer.addEventListener('dragstart', (e) => {
            if (content) {
                startDrag(e, overlayContainer, content);
            }
        });

        if (content.mediaType === 'video') {
            let playButton = document.createElement('img');
            playButton.src = 'demo/public/images/play-icon.svg';
            playButton.className = 'play-button';
            overlayContainer.appendChild(playButton);
        }

        let img = document.createElement('img');
        img.src = url;
        overlayContainer.appendChild(img);

        contentBar!.appendChild(overlayContainer);
    }
    let is_inside = false;
    contentBar.onmouseenter = () => {
        is_inside = true;
        setTimeout(() => {
            if (is_inside) {
                for (let child_ of contentBar!.children) {
                    let child = child_ as HTMLDivElement;
                    child.style.transition = '';
                }
            }
        }, 100);
    };
    contentBar.onmouseleave = () => {
        is_inside = false;
        for (let child_ of contentBar!.children) {
            let child = child_ as HTMLDivElement;
            child.style.width = '65px';
            child.style.height = '60px';
            child.style.marginBottom = '20px';
            child.style.transition = 'all 0.1s';
        }
    };
    contentBar.onmousemove = (e) => {
        if (is_inside && !curdrag) {
            contentBar!.style.transition = '';
            let mousePos = e.clientX;

            let contentBarWidth = contentBar!.offsetWidth;
            let screenCenter = contentBar!.offsetLeft;
            let mousePosRel = mousePos - screenCenter + 0.5 * contentBarWidth;

            for (let child_ of contentBar!.children) {
                let child = child_ as HTMLDivElement;
                let pos = child.offsetLeft + child.offsetWidth / 2.0;

                let dist = Math.abs(pos - mousePosRel) / 200;
                let bumped = bump(dist);

                let newSize = Math.max(0, 60 * bumped);

                child.style.width = `${65 + newSize}px`;
                child.style.height = `${60 + newSize}px`;
                child.style.marginBottom = `${20 + 1 + newSize}px`;
            }
        }
    };

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', () => mouseReleased(setContent));
    window.addEventListener('mouseleave', () => mouseReleased(setContent));
}

function setActive(container: HTMLElement) {
    let active = document.getElementsByClassName('overlay-content-active')[0];
    if (active) {
        active.classList.remove('overlay-content-active');
    }
    container.classList.add('overlay-content-active');
}

// https://www.johndcook.com/blog/2022/06/23/bump-functions/
function bump(x: number) {
    if (x > 1) {
        return 0;
    }
    let v = (x + 1) * (1 - x);
    return v * v;
}

interface DragState {
    img: HTMLDivElement;
    ref: Content;
    startPos: { x: number; y: number };
}

let curdrag: DragState | null = null;

function mouseReleased(setContent: (c: Content) => void) {
    if (curdrag) {
        endDrag(setContent, curdrag);
        curdrag = null;
    }
}

function mousemove(event: MouseEvent) {
    if (curdrag) {
        let x = Math.floor(event.clientX - curdrag.startPos.x);
        let y = Math.floor(event.clientY - curdrag.startPos.y);
        curdrag.img.style.transform = `translate(${x}px, ${y}px)`;
    }
}

function startDrag(event: DragEvent, obj: HTMLDivElement, ref: Content) {
    event.preventDefault();
    curdrag = {
        img: obj,
        ref: ref,
        startPos: {
            x: event.clientX,
            y: event.clientY,
        },
    };
}

function endDrag(setContent: (c: Content) => void, state: DragState) {
    setContent(state.ref);
    state.img.style.transform = '';
    setActive(state.img);
}
