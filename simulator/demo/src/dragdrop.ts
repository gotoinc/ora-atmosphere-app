import { Simulator } from './scene.ts';

export function initDragnDrop(canvas: HTMLCanvasElement, sim: Simulator) {
    canvas.ondrop = async function (event) {
        event.preventDefault();
        sim.setDragDropVisible(false);

        if (!event.dataTransfer || event.dataTransfer.files.length === 0) {
            return;
        }

        let file = event.dataTransfer!.files[0];
        const url = URL.createObjectURL(file);

        if (file.type.startsWith('video')) {
            await sim.setContent({ mediaType: 'video', URL: url });
            return;
        }

        if (file.type.startsWith('image')) {
            await sim.setContent({ mediaType: 'image', URL: url });
            return;
        }
    };

    canvas.ondragleave = function () {
        sim.setDragDropVisible(false);
    };

    canvas.ondragover = function (event) {
        event.preventDefault();
        sim.setDragDropVisible(true);
    };
}
