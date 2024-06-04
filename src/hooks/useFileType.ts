export const useFileType = (blob: Blob): 'video' | 'image' | undefined => {
    const fileType = blob.type;

    if (fileType.startsWith('video/')) {
        return 'video';
    }

    if (fileType.startsWith('image/')) {
        return 'image';
    }
};
