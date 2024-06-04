// import type { LocationQueryValue } from 'vue-router';
type SearchItem = {
    id: string | number;
};

export const useGetId = <T extends SearchItem>(
    searchArray: T[],
    id: string | number
) => {
    return searchArray.find((item) => item.id === id)?.id;
};
