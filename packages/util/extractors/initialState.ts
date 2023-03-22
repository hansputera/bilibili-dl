import * as vm from 'node:vm';
import {between} from './between';

/**
 * Extract `window.__INITIAL_STATE__` data.
 * @param {string} html HTML Plain.
 * @return {*}
 */
export const extractInitialState = (html: string): any => {
    const scriptWant2Execute = between(html, 'window.__initialState=', '</');
    if (!scriptWant2Execute?.length) return undefined;

    return vm.runInThisContext(scriptWant2Execute, {
        filename: 'initialState.vm',
    });
};
