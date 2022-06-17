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

const v = new Validator();
export default async (req: NextApiRequest, res: NextApiResponse) => {
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

    if (process.env.NODE_ENV === 'development') {
        await redis.del(
            req.body.query?.toLowerCase() ||
                (req.query.query as string)?.toLowerCase(),
        );
    }
    const filter =
        (req.body.filter || req.query.filter)?.toLowerCase() ?? 'all';
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
            JSON.stringify(result),
            'EX',
            maxLifetimeData,
        );
    }

    return res.status(200).json(
        result
            .filter((c) => (filter === 'all' ? true : filter === c.type))
            .map((c) =>
                instanceToPlain(c, {
                    strategy: 'excludeAll',
                }),
            ),
    );
};
