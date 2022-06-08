import type {NextApiRequest, NextApiResponse} from 'next';
import {searchQuery} from '@bilibili-dl/core';
import {instanceToPlain} from '@bilibili-dl/util';
import Validator from 'fastest-validator';

const v = new Validator();
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const validReq = v.compile({
        query: {
            type: 'string',
            min: 5,
            max: 255,
        },
    })(req.body || req.query);

    if (typeof validReq === 'object') {
        return res.status(400).json(validReq);
    }

    const result = await searchQuery(req.body.query || req.query.query);
    return res.status(200).json(
        result.map((c) =>
            instanceToPlain(c, {
                strategy: 'excludeAll',
            }),
        ),
    );
};
