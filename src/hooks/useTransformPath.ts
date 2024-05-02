export const useTransformPath = (path: string) =>
    path.toLowerCase().replace(/\s+/g, '-');

export const useTransformFromPath = (path: string) => path.replace(/-/g, ' ');
