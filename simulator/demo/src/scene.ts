import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { MirrorTexture } from '@babylonjs/core/Materials/Textures/mirrorTexture';
import { PBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import { Plane } from '@babylonjs/core/Maths/math.plane';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Quaternion, Vector3 } from '@babylonjs/core/Maths/math.vector';
import '@babylonjs/core/Rendering/prePassRendererSceneComponent';
import '@babylonjs/core/Rendering/geometryBufferRendererSceneComponent';
import '@babylonjs/loaders';
import '@babylonjs/core/Materials/Textures/Loaders/envTextureLoader';
import '@babylonjs/core/Helpers/sceneHelpers';
import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture';
import {
    DirectionalLight,
    HemisphericLight,
    PointerEventTypes,
    PointerInfo,
    ShadowGenerator,
} from '@babylonjs/core';

const s3_bucket = 'simulator/demo/public/images/';
const default_room_glb_url = s3_bucket + 'expo.glb';
const default_environment_url = s3_bucket + 'environment.env';
const default_people_glb_url = s3_bucket + 'people.glb';
const play_sphere_url = s3_bucket + 'play-sphere.png';
const base_glb_url = s3_bucket + 'base.glb';
const drop_icon_url = s3_bucket + 'drop-icon.png';
const default_diameter = 80;

export type Content = {
    URL: string;
    mediaType?: 'video' | 'image';
    paused?: boolean;
};

export interface Room {
    scene_glb: string;
    environment?: string;
    people_glb?: string;
}

export class Simulator {
    scene: Scene;
    sphere: AbstractMesh;
    playPlanes: AbstractMesh[];
    curVideo: VideoTexture | null = null;
    camera: ArcRotateCamera;
    video?: HTMLVideoElement;
    dragdropmesh: AbstractMesh;
    private _peopleVisible: boolean = true;
    private _onFinishCallback?: () => void;
    private _onLoadedMediaCallback?: () => void;

    constructor(
        engine: Engine,
        canvas: HTMLCanvasElement,
        default_content: Content,
        video?: HTMLVideoElement,
        default_room?: Room
    ) {
        this.video = video;

        let scene = new Scene(engine);

        let dragdroptex = new Texture(drop_icon_url);

        let dragdropmesh = MeshBuilder.CreatePlane(
            'dragdrop',
            { size: 0.02 },
            scene
        );
        let dragdropmat = new PBRMaterial('dragdrop', scene);
        dragdropmat.emissiveTexture = dragdroptex;
        dragdropmat.emissiveColor = new Color3(1, 1, 1);
        dragdropmat.emissiveIntensity = 1.0;
        dragdropmat.opacityTexture = dragdroptex;
        dragdropmat.metallic = 0.0;
        dragdropmat.roughness = 0.0;
        dragdropmat.albedoColor = new Color3(0.0, 0.0, 0.0);
        dragdropmat.specularIntensity = 0.0;
        dragdropmat.environmentIntensity = 0.0;
        dragdropmesh.material = dragdropmat;
        dragdropmesh.isVisible = false;

        this.dragdropmesh = dragdropmesh;

        let camera = new ArcRotateCamera(
            'camera',
            -Math.PI / 2,
            Math.PI / 2.5,
            1,
            new Vector3(0, 1, 0)
        );
        camera.wheelDeltaPercentage = 0.005;
        camera.fov = (70 / 180) * Math.PI;
        camera.attachControl(canvas, true);
        camera.upperRadiusLimit = 3.0;
        camera.lowerRadiusLimit = 0.8;
        camera.minZ = 0.01;
        camera.upperBetaLimit = Math.PI / 2 + 0.3;
        camera.lowerBetaLimit = 0.0;
        camera.panningDistanceLimit = 0.00001;
        camera.radius = 2.0;

        let playPlaneMat = new PBRMaterial('playPlaneMat', scene);
        playPlaneMat.metallic = 0.0;
        playPlaneMat.roughness = 0.0;
        playPlaneMat.emissiveIntensity = 1.0;
        playPlaneMat.emissiveColor = new Color3(1, 1, 1);
        playPlaneMat.albedoColor = new Color3(0.0, 0.0, 0.0);
        let play_sphere_tex = new Texture(play_sphere_url, scene);
        playPlaneMat.opacityTexture = play_sphere_tex;
        playPlaneMat.reflectionColor = new Color3(0.3, 0.3, 0.3);
        playPlaneMat.specularIntensity = 0.015;
        playPlaneMat.environmentIntensity = 0.0;
        playPlaneMat.emissiveTexture = play_sphere_tex;

        let plane = MeshBuilder.CreatePlane(
            'playPlanes',
            { size: 0.15 },
            scene
        );
        plane.material = playPlaneMat;
        plane.isVisible = false;
        plane.isPickable = false;
        this.playPlanes = [plane];
        for (let i = 1; i < 3; i++) {
            this.playPlanes.push(plane.clone('playPlanes' + i));
        }
        let mat = new PBRMaterial('mat', scene);
        mat.metallic = 0.0;
        mat.roughness = 0.4;
        mat.emissiveIntensity = 1.0;
        mat.emissiveColor = new Color3(1, 1, 1);
        mat.albedoColor = new Color3(0.0, 0.0, 0.0);
        mat.reflectionColor = new Color3(0.3, 0.3, 0.3);
        mat.specularIntensity = 0.015;
        mat.environmentIntensity = 0.0;

        scene.animationsEnabled = true;

        let dummyMesh = MeshBuilder.CreateBox('box', {}, scene);
        dummyMesh.setEnabled(false);
        dummyMesh.material = mat;
        this.sphere = dummyMesh;

        scene.onPointerObservable.add((info) => this.onPointer(info));

        scene.lights = [];
        scene.clearColor = new Color4(0, 0, 0, 0);

        let environmentTex =
            default_room?.environment || default_environment_url;

        if (environmentTex) {
            const envTex = CubeTexture.CreateFromPrefilteredData(
                environmentTex,
                scene
            );
            scene.createDefaultEnvironment({
                environmentTexture: envTex,
                createSkybox: false,
                createGround: false,
            });
            scene.createDefaultSkybox(envTex, true, 1000);
            scene.environmentIntensity = 2;
        } else {
            let l = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
            l.intensity = 100.0;
        }

        SceneLoader.Append('', base_glb_url, scene);

        SceneLoader.Append(
            '',
            default_room?.people_glb || default_people_glb_url,
            scene
        );

        SceneLoader.Append(
            '',
            default_room?.scene_glb || default_room_glb_url,
            scene,
            (scene) => {
                let mt = new MirrorTexture('mirrorTexture', 512, scene, true);
                mt.mirrorPlane = Plane.FromPositionAndNormal(
                    new Vector3(0, 0.01, 0),
                    new Vector3(0, -1, 0)
                );
                mt.adaptiveBlurKernel = 50;
                mt.renderList = scene.meshes.filter((mesh) => {
                    return !mesh.material?.name.startsWith('Mirror');
                });

                for (let light of scene.lights) {
                    if (light instanceof DirectionalLight) {
                        light.shadowEnabled = true;
                        light.shadowFrustumSize = 15;
                        light.intensity *= 1.5;

                        const shadowGenerator = new ShadowGenerator(
                            2048,
                            light
                        );
                        shadowGenerator.usePercentageCloserFiltering = true;
                        shadowGenerator.getShadowMap()!.renderListPredicate = (
                            mesh
                        ) => {
                            return (mesh.material?.alpha || 1.0) == 1.0;
                        };
                    }
                    light.intensity /= 683; // blender uses actual candela whereas babylon uses watts
                }

                let mirrorUsed = false;
                for (let material of scene.materials) {
                    if (material.name === 'skyBox') {
                        continue;
                    }
                    material.backFaceCulling = true;
                    (material as StandardMaterial).maxSimultaneousLights = 8;

                    if (material.name.startsWith('Baked')) {
                        (material as PBRMaterial).lightmapTexture = (
                            material as PBRMaterial
                        ).albedoTexture;
                    }

                    if (!material.name.startsWith('Mirror')) {
                        continue;
                    }
                    mirrorUsed = true;
                    (material as StandardMaterial).reflectionTexture = mt;
                    (material as PBRMaterial).disableLighting = true;
                }

                for (let mesh of scene.meshes) {
                    mesh.receiveShadows = true;
                }

                if (!mirrorUsed) {
                    mt.disposeFramebufferObjects();
                    mt.dispose();
                }

                this.setDiameter(default_diameter);

                this._onFinish();
            }
        );

        this.scene = scene;
        this.sphere = dummyMesh;
        this.camera = camera;
        default_content.paused = true;
        this.setContent(default_content);
    }

    setDiameter(diameter_centimeters: number) {
        let sphere = MeshBuilder.CreateSphere(
            'box',
            {
                diameter: diameter_centimeters / 100,
            },
            this.scene
        );
        sphere.position = new Vector3(
            0.0,
            0.9 + diameter_centimeters / 200,
            0.0
        );
        this.camera.target = sphere.position.clone();
        this.camera.lowerRadiusLimit = (diameter_centimeters / 200) * 1.5;
        sphere.scaling.y = -1.0;
        sphere.scaling.x = -1.0;
        sphere.rotation = this.sphere.rotation.clone();
        sphere.material = this.sphere.material;
        sphere.setEnabled(true);
        this.sphere.dispose();
        this.sphere = sphere;

        for (let i = 0; i < this.playPlanes.length; i++) {
            let plane = this.playPlanes[i];
            let ang = ((Math.PI * 2) / 3) * i;
            let dist = diameter_centimeters / 200;
            plane.position = new Vector3(
                Math.cos(ang) * dist,
                0.9 + diameter_centimeters / 200,
                Math.sin(ang) * dist
            );
            plane.rotation = new Vector3(0.0, -ang - Math.PI / 2, 0.0);
        }
    }

    set peopleVisible(visible: boolean) {
        // for (let mesh of this.scene.meshes) {
        //     if (mesh.name.startsWith('person')) {
        //         mesh.isVisible = visible;
        //     }
        // }

        this._peopleVisible = visible;
        // document.getElementById('settings-people-visible')!.style.display =
        //     visible ? 'none' : 'flex';
    }

    get peopleVisible() {
        return this._peopleVisible;
    }

    async setContent(content: Content) {
        if (content.mediaType === undefined) {
            let mimeType = await getMIMEType(content.URL);
            if (mimeType.startsWith('video')) {
                content.mediaType = 'video';
            } else if (mimeType.startsWith('image')) {
                content.mediaType = 'image';
            } else {
                console.error(
                    'Unsupported media type: ' + mimeType + ' for ' + content
                );
                return;
            }
        }

        let updateEmissive = (tex: Texture) => {
            return () => {
                (
                    this.sphere.material as PBRMaterial
                ).emissiveTexture?.dispose();
                (this.sphere.material as PBRMaterial).emissiveTexture = tex;
            };
        };

        for (let plane of this.playPlanes) {
            plane.isVisible = false;
        }

        switch (content.mediaType) {
            case 'video':
                if (this.curVideo) {
                    this.curVideo.video.pause();
                    this.curVideo.video.currentTime = 0;
                    this.curVideo.dispose();
                }

                if (this.video) {
                    this.video.src = content.URL;
                    this.video.crossOrigin = 'anonymous';
                    this.video.muted = true;

                    this.curVideo = new VideoTexture(
                        'sphereVideo',
                        this.video as HTMLVideoElement,
                        this.scene,
                        false,
                        undefined,
                        undefined,
                        {
                            muted: true,
                        }
                    );

                    this.video.onpause = () => {
                        for (let plane of this.playPlanes) {
                            plane.isVisible = true;
                        }
                    };

                    this.video.onplay = () => {
                        for (let plane of this.playPlanes) {
                            plane.isVisible = false;
                        }
                    };

                    this.curVideo.onLoadObservable.addOnce(() => {
                        if (content?.paused) {
                            for (let plane of this.playPlanes) {
                                plane.isVisible = true;
                            }
                            this.curVideo!.video.pause();
                        } else {
                            this.curVideo!.video.play();
                        }

                        updateEmissive(this.curVideo!)();

                        this._onLoadedMedia();
                    });
                }

                return;
            case 'image':
                if (this.curVideo) {
                    this.curVideo.video.pause();
                    this.curVideo.video.currentTime = 0;
                    this.curVideo.dispose();
                    this.curVideo = null;
                }
                let tex = new Texture(content.URL, this.scene, true);
                tex.onLoadObservable.addOnce(updateEmissive(tex));
                return;
        }
    }

    render() {
        if (!this.curVideo) {
            this.sphere.rotation.y += 0.001;
        }

        if (this.dragdropmesh.isVisible) {
            // put mesh in front of camera
            this.dragdropmesh.position = this.camera.getFrontPosition(0.05);
            let dir = this.camera
                .getFrontPosition(1)
                .subtract(this.camera.getFrontPosition(0.0));
            let right = Vector3.Cross(dir, Vector3.Up()).normalize();
            let up = Vector3.Cross(right, dir).normalize();
            this.dragdropmesh.rotationQuaternion =
                Quaternion.FromLookDirectionRH(dir, up);
        }

        this.scene.render();
    }

    setDragDropVisible(visible: boolean) {
        this.dragdropmesh.isVisible = visible;
    }

    private onPointer(info: PointerInfo) {
        switch (info.type) {
            case PointerEventTypes.POINTERDOWN:
                break;
            case PointerEventTypes.POINTERUP:
                break;
            case PointerEventTypes.POINTERMOVE:
                break;
            case PointerEventTypes.POINTERWHEEL:
                break;
            case PointerEventTypes.POINTERPICK:
                break;
            case PointerEventTypes.POINTERTAP:
                if (info.pickInfo) {
                    let hit = info.pickInfo.pickedMesh;

                    if (hit?.name.startsWith('person')) {
                        this.peopleVisible = false;
                    }
                    if (hit === this.sphere) {
                        if (this.curVideo) {
                            if (this.curVideo.video.paused) {
                                this.curVideo.video.play();
                                for (let plane of this.playPlanes) {
                                    plane.isVisible = false;
                                }
                            } else {
                                this.curVideo.video.pause();
                                for (let plane of this.playPlanes) {
                                    plane.isVisible = true;
                                }
                            }
                        }
                    }
                }
                break;
            case PointerEventTypes.POINTERDOUBLETAP:
                break;
        }
    }

    onFinish(callback: () => void) {
        this._onFinishCallback = callback;
    }

    onLoadedMedia(callback: () => void) {
        this._onLoadedMedia = callback;
    }

    private _onFinish() {
        if (this._onFinishCallback) {
            this._onFinishCallback();
        }
    }

    private _onLoadedMedia() {
        if (this._onLoadedMediaCallback) {
            this._onLoadedMediaCallback();
        }
    }
}

async function getMIMEType(url: string): Promise<string> {
    let response = await fetch(url, {
        method: 'HEAD',
    });
    return response.headers.get('Content-Type') || '';
}
