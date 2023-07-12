import Anime from "@/components/Home/Anime";
import Popular from "@/components/Home/Popular";
import Recomendation from "@/components/Home/Recomendation";
import {
  getPopularList,
  getTimelineList,
  getTrendingList,
} from "@bilibili-dl/core";
import { Stack } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { SupportedLocales } from "@bilibili-dl/config/constants";
import type { PopularData } from "@bilibili-dl/interfaces/api";
import {
  CarouselAnime,
  PickCarousel,
  OngoingAnime,
  TrendingAnime,
} from "@bilibili-dl/interfaces/web/home/anime.type";

/**
 * Index page.
 * @return {JSX.Element}
 */
export default function Index({
  popularList,
  carouselList,
}: {
  popularList: PopularData;
  carouselList: CarouselAnime;
}): JSX.Element {
  return (
    <Stack spacing="lg">
      <Popular popularList={popularList} />
      <Anime animeList={carouselList} />
      <Recomendation />
    </Stack>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const timelineList = (
    (await getTimelineList(ctx.locale as SupportedLocales))
      .items as unknown as OngoingAnime[]
  ).map((item) => ({ ...item, key: item.day_of_week.toLowerCase() }));
  const trendingList: TrendingAnime = {
    ...(await getTrendingList(ctx.locale as SupportedLocales)),
    key: ctx.locale === "en-US" ? PickCarousel.popular : PickCarousel.populer,
  };
  const carouselList: CarouselAnime = [trendingList, ...timelineList];

  return {
    props: {
      messages: (await import(`../lang/${ctx.locale}.json`)).default,
      popularList: await getPopularList(ctx.locale as SupportedLocales),
      carouselList,
    },
  };
};
