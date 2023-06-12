import got from 'got';
import {apiBaseURL, baseURL} from '@bilibili-dl/config/constants.js';

export const fetchAPI = got.extend({
    prefixUrl: apiBaseURL,
});

export const fetchBase = got.extend({
    prefixUrl: baseURL,
});
