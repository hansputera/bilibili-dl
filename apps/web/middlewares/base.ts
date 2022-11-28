import type {NextApiRequest, NextApiResponse} from 'next';

type MiddlewareFunc = <Req, Res, C>(req: Req, res: Res, c?: C) => Promise<void>;

/**
 * Run middleware
 * @param {NextApiRequest} request API Request
 * @param {NextApiResponse} response API Response
 * @param {Function} fn Middleware function
 * @return {Promise<MiddlewareFunc>}
 */
export const runMiddleware = (
    request: NextApiRequest,
    response: NextApiResponse,
    fn: MiddlewareFunc,
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
