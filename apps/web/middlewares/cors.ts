import cors from 'cors';
import {NextApiRequest, NextApiResponse} from 'next';
import {runMiddleware} from './base';

/**
 * Apply CORS
 * @param {NextApiRequest} request NextJS API Request
 * @param {NextApiResponse} response NextJS API Response
 * @return {Promise<void>}
 */
export const applyCors = (request: NextApiRequest, response: NextApiResponse) =>
    runMiddleware(
        request,
        response,
        cors({
            methods: ['GET', 'POST'],
            origin: '*',
        }),
    );
