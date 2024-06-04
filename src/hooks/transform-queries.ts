import type { LocationQueryValue } from 'vue-router';

export const useTransformPath = (path: string) =>
    path.toLowerCase().replace(/\s+/g, '-');

export const useTransformFromPath = (path: string) => path.replace(/-/g, ' ');

export const transformArraysToQueries = (array: LocationQueryValue[]) =>
    array.map((item) => useTransformPath(item as string));

export const transformArraysFromQueries = (
    array: Array<LocationQueryValue | string>
) => array.map((item) => useTransformFromPath(item as string));

export const queriesToArray = (
    item: LocationQueryValue | LocationQueryValue[]
): LocationQueryValue[] => {
    return Array.isArray(item) ? [...item] : item ? [item] : [];
};
