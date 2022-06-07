import got from 'got';
import {apiBaseURL} from '@bilibili-dl/config/constants.js';

export const fetchAPI = got.extend({
    prefixUrl: apiBaseURL,
});
