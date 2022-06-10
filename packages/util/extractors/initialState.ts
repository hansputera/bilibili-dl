import {jsonParse} from '..';

/**
 * Extract `window.__INITIAL_STATE__` data.
 * @param {string} html HTML Plain.
 * @return {*}
 */
export const extractInitialState = (html: string): any => {
    return jsonParse(
        '{'.concat(
            html.match(/window\.__INITIAL_STATE__=\{(.*)\}\}/i)?.at(1)!,
            '}}',
        ),
    );
};
