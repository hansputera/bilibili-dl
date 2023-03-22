import type {NextApiRequest, NextApiResponse} from 'next';
import {searchQuery} from '@bilibili-dl/core';
import Validator from 'fastest-validator';
import {
    compare,
    instanceToPlain,
    ItemTransformed,
    jsonParse,
} from '@bilibili-dl/util';

import {redis} from '../../lib/redis';
import {maxLifetimeData} from '../../config';
import {supportedLocales} from '@bilibili-dl/config/constants.js';
import {applyCors} from '../../middlewares/cors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await applyCors(req, res);

    const v = new Validator();
    const validReq = v.compile({
        query: {
            type: 'string',
            min: 5,
            max: 255,
        },
        filter: {
            type: 'enum',
            values: ['anime', 'video'],
            optional: true,
        },
        locale: {
            type: 'enum',
            values: supportedLocales,
            optional: true,
            default: 'en_US',
        },
    })(req.body || req.query);

    if (typeof validReq === 'object') {
        return res.status(400).json(validReq);
    }
    package;

    if (process.env.NODE_ENV === 'development') {
        await redis.del(
            req.body.query?.toLowerCase() ||
                (req.query.query as string)?.toLowerCase(),
        );
    }

    let result: ItemTransformed[] = jsonParse(
        (await redis.get(
            req.body.query?.toLowerCase() ||
                (req.query.query as string)?.toLowerCase(),
        )) as string,
        [],
    );

    if (
        !result.length ||
        compare(result[0], {} as unknown as ItemTransformed)
    ) {
        result = await searchQuery(
            req.body.query?.toLowerCase() ||
                (req.query.query as string)?.toLowerCase(),
            req.body.locale || req.query.locale || 'en_US',
        );
        await redis.set(
            req.body.query?.toLowerCase() ||
                (req.query.query as string)?.toLowerCase(),
            JSON.stringify(
                result.map((x) =>
                    instanceToPlain(x, {
                        strategy: 'excludeAll',
                    }),
                ),
            ),
            'EX',
            maxLifetimeData,
        );
    }

    const filter =
        (req.body.filter || req.query.filter)?.toLowerCase() ?? 'all';
    result = result.filter((c) =>
        filter === 'all' ? true : filter === c.type,
    );
    return res.status(200).json(
        result[0] instanceof ItemTransformed
            ? result.map((c) =>
                  instanceToPlain(c, {
                      strategy: 'excludeAll',
                  }),
              )
            : result,
    );
};
