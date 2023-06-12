import Validator from "fastest-validator";
import { supportedLocales } from "@bilibili-dl/config/constants.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSubtitle } from "@bilibili-dl/core";
import { transformSubtitle } from "@bilibili-dl/util";
import { SubtitleData } from "@bilibili-dl/interfaces/core";
import { applyCors } from "../../middlewares/cors";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  await applyCors(request, response);

  const validator = new Validator();
  const validatorPayload = validator.compile({
    id: {
      type: "string",
    },
    locale: {
      type: "enum",
      values: supportedLocales,
    },
  })(request.body || request.query);

  if (typeof validatorPayload === "object") {
    return response.status(400).json(validatorPayload);
  }

  const [id, locale] = [
    (request.body?.id || request.query?.id).toLowerCase(),
    (request.body?.locale || request.query?.locale).toLowerCase(),
  ];

  const subres = await getSubtitle(id, locale);
  try {
    const json = JSON.parse(subres as string);
    transformSubtitle(json as SubtitleData).pipe(response);
  } catch {
    return response
      .status(200)
      .setHeader("Content-Type", "text/x-ssa; charset=utf-8")
      .send(subres);
  }
  return response
    .status(200)
    .setHeader("Content-Type", "text/x-srt; charset=utf-8");
};
