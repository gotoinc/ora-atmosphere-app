export const useClickOutsideElement = (
    e: Event,
    element: HTMLElement,
    callback: () => void
): void => {
    if (e.target !== element && !element.contains(e.target as Node)) {
        callback();
    }
};
