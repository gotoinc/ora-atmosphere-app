export const useCompareObjects = (
    first: NonNullable<unknown>,
    second: NonNullable<unknown>
) => {
    const keys = Object.keys(first);

    for (const key of keys) {
        if (first[key] !== second[key]) {
            return false; // return false, if objects are different
        }
    }

    return true; // return true, if objects are the same
};

export const useCompareArrays = (first: string[], second: string[]) => {
    if (first.length !== second.length) {
        return false;
    }

    // Sort both arrays
    const sortedArr1 = first.slice().sort();
    const sortedArr2 = second.slice().sort();

    // Compare each element
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
};
