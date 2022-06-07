/**
 * Compare something with something.
 * @param {T} first First argument.
 * @param {T} second Second argument want to compare.
 * @return {boolean}
 */
export function compare<T>(first: T, second: T): boolean {
    if (Array.isArray(first) && Array.isArray(second)) {
        return (
            first.length === second.length &&
            JSON.stringify(first) === JSON.stringify(second)
        );
    } else if (
        !Array.isArray(first) &&
        !Array.isArray(second) &&
        typeof first === 'object' &&
        typeof second === 'object'
    ) {
        return Object.is(first, second);
    } else {
        return first === second;
    }
}
