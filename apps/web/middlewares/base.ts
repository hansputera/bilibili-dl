import type {NextApiRequest, NextApiResponse} from 'next';

/**
 * Run middleware
 * @param {NextApiRequest} request API Request
 * @param {NextApiResponse} response API Response
 * @param {Function} fn Middleware function
 * @return {Promise<Function>}
 */
export const runMiddleware = <T extends Function>(
    request: NextApiRequest,
    response: NextApiResponse,
    fn: T,
) =>
    new Promise((resolve, reject) => {
        fn(request, response, (result: unknown) => {
            response.status(500);

            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
