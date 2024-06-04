import type { LocationQueryValue } from 'vue-router';

export const useTransformPath = (path: string) =>
    path.toLowerCase().replace(/\s+/g, '-');

export const useTransformFromPath = (path: string) => path.replace(/-/g, ' ');

export const transformArraysToQueries = (array: unknown[]) =>
    array.map((item) => useTransformPath(item as string));

export const transformArraysFromQueries = (
    array: Array<LocationQueryValue | string>
) => array.map((item) => useTransformFromPath(item as string));

export const queriesToArray = (
    item: LocationQueryValue | LocationQueryValue[],
    isNumber?: boolean
) => {
    if (Array.isArray(item)) {
        return isNumber ? [...item.map((i) => Number(i))] : [...item];
    } else if (item) {
        return isNumber ? [Number(item)] : [item];
    }

    return [];
};
