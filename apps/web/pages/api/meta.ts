import {getBtvID} from '@bilibili-dl/util';
import Validator from 'fastest-validator';
import {NextApiRequest, NextApiResponse} from 'next';

const v = new Validator();
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const validationRequest = v.compile({
        url: {
            type: 'url',
        },
    })(req.body || req.query);

    if (typeof validationRequest === 'object') {
        return res.status(400).json(validationRequest);
    }

    if (!getBtvID(req.body.url || req.query.url)) {
        return res.status(400).json({
            message: 'Please send valid bilibili.tv video URL!',
        });
    }

    return res.status(200).json({
        message: 'OK!',
    });
};
