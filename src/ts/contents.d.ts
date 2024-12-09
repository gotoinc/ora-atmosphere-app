import type { Topic } from '@/ts/catalog';
import type { Audio, Identifiable } from '@/ts/common';

export interface VideoContent {
    id: number;
    title: string;
    description?: string;
    video_files: VideoFile[];
    requires_auth: boolean;
    preview_image?: string;
    audio_enabled: boolean;
    is_realtime: boolean;
    narration_enabled: boolean;
    show_on_main_banner: boolean;
    visible_for_unregistered: boolean;
    duration: number;
    date_created: string;
    topic: Topic;
    audios?: Audio[];
    tags?: string;
}

export interface VideoFile {
    file: string;
    language: Identifiable;
}
