import parser from "accept-language-parser";
import { getCookie, setCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";

export const LANG_COOKIE_KEY = "i18n-lang";
const SUPPORTED_LANGS = ["en", "id"];
const DEFAULT_LANG = "en";

const getBrowserLanguage = (ctx: GetServerSidePropsContext) => {
  const languages = ctx.req.headers["accept-language"];
  return (
    parser.pick(SUPPORTED_LANGS, languages ?? "", { loose: true }) ??
    DEFAULT_LANG
  );
};

export const getLocale = async (
  ctx: GetServerSidePropsContext
): Promise<string> => {
  const cookieLanguage = getCookie(LANG_COOKIE_KEY, ctx);

  if (cookieLanguage === "browser") {
    return getBrowserLanguage(ctx);
  }

  if (
    cookieLanguage &&
    typeof cookieLanguage === "string" &&
    SUPPORTED_LANGS.includes(cookieLanguage)
  ) {
    return cookieLanguage;
  }

  setCookie(LANG_COOKIE_KEY, "browser", { ...ctx, sameSite: "lax" });
  return getBrowserLanguage(ctx);
};
