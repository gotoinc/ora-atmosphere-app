// eslint-disable-next-line
export const useCompareObjects = <T extends Record<string, any>>(
    first: T,
    second: T
) => {
    // eslint-disable-next-line
    const differentValues: Record<string, any> = {};
    const keys = Object.keys(first);

    for (const key of keys) {
        if (first[key] !== second[key]) {
            // eslint-disable-next-line
            differentValues[key] = second[key];
        }
    }

    return Object.keys(differentValues).length > 0 ? differentValues : null; // return false, if objects are the same
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
