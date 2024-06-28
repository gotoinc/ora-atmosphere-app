// @ts-ignore
import { Engine } from '@babylonjs/core/Engines/engine';
import '@babylonjs/core/Loading/loadingScreen';
import '@babylonjs/core/Engines/WebGPU/Extensions/';
import '@babylonjs/core/Engines/webgpuEngine';
import { Content, Room, Simulator } from './scene.ts';
// @ts-ignore
import { WebGPUEngine } from '@babylonjs/core';
import { initDragnDrop } from './dragdrop.ts';

function WebGPUSupportedAsync(): Promise<boolean> {
    return !navigator.gpu
        ? Promise.resolve(false)
        : navigator.gpu
              .requestAdapter()
              .then(
                  (adapter) => !!adapter,
                  () => false
              )
              .catch(() => false);
}

export async function attachSimulator(
    root: HTMLDivElement,
    content: Content,
    video?: HTMLVideoElement,
    room?: Room
): Promise<Simulator> {
    let engine: Engine;

    root.style.display = 'flex';
    let canvas = document.createElement('canvas');
    canvas.width = root.clientWidth;
    canvas.height = root.clientHeight;
    canvas.style.outline = 'none';
    root.appendChild(canvas);

    if (await WebGPUSupportedAsync()) {
        const webgpu = new WebGPUEngine(canvas, {
            antialias: true,
            powerPreference: 'high-performance',
        });
        await webgpu.initAsync();
        engine = webgpu;
    } else {
        engine = new Engine(canvas, true);
    }

    engine.resize();

    let viz = new Simulator(engine, canvas, content, video, room);

    initDragnDrop(canvas, viz);

    engine.runRenderLoop(() => viz.render());
    new ResizeObserver((entries) => {
        canvas.width = entries[0].contentRect.width;
        canvas.height = entries[0].contentRect.height;
        engine.resize(true);
    }).observe(root);

    return viz;
}
