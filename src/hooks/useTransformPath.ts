import type { LocationQueryValue } from 'vue-router';

export const useTransformPath = (path: string) =>
    path.toLowerCase().replace(/\s+/g, '-');

export const useTransformFromPath = (path: string) => path.replace(/-/g, ' ');

export const transformArraysToQueries = (array: LocationQueryValue[]) =>
    array.map((item) => useTransformPath(item as string));

export const transformArraysFromQueries = (array: LocationQueryValue[]) =>
    array.map((item) => useTransformFromPath(item as string));
