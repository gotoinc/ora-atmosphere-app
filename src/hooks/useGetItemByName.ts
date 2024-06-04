import type { LocationQueryValue } from 'vue-router';

export const useGetItemByName = (
    searchArray: string[] | LocationQueryValue[],
    name: string
) => {
    return searchArray.find((tagName) => tagName === name) ?? '';
};
