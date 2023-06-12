import type { NextApiRequest, NextApiResponse } from "next";
import Validator from "fastest-validator";

import {
  SupportedLocales,
  supportedLocales,
} from "@bilibili-dl/config/constants.js";
import { applyCors } from "../../middlewares/cors";
import { getRecommendList } from "@bilibili-dl/core";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await applyCors(req, res);

  const v = new Validator();
  const validReq = v.compile({
    locale: {
      type: "enum",
      values: supportedLocales,
      optional: true,
      default: "en_US",
    },
    ps: "string",
  })(req.query);

  if (typeof validReq === "object") {
    return res.status(400).json(validReq);
  }

  const data = await getRecommendList(
    req.query.locale as SupportedLocales,
    req.query.ps as unknown as number
  );

  return res.status(200).json({ data });
};
