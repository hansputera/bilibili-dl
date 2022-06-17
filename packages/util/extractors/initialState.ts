import * as vm from 'node:vm';

/**
 * Extract `window.__INITIAL_STATE__` data.
 * @param {string} html HTML Plain.
 * @return {*}
 */
export const extractInitialState = (html: string): any => {
    const scriptWant2Execute = html
        .match(/\__initialState=(.*)\"\)\)/i)
        ?.at(1)
        ?.concat('"))');
    if (!scriptWant2Execute) {
        return undefined;
    }

    return vm.runInThisContext(scriptWant2Execute, {
        filename: 'initialState.vm',
    });
};
