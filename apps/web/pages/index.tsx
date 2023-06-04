import Anime from "@/components/Home/Anime";
import Popular from "@/components/Home/Popular";
import Recomendation from "@/components/Home/Recomendation";
import { getPopularList, getTimelineList } from "@bilibili-dl/core";
import { Stack } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import type {
  PopularCards,
  ListTimelineAnime,
} from "@bilibili-dl/interfaces/core";
import { SupportedLocales } from "@bilibili-dl/config/constants";

/**
 * Index page.
 * @return {JSX.Element}
 */
export default function Index({
  popularList,
  timelineList,
}: {
  popularList: PopularCards;
  timelineList: ListTimelineAnime;
}): JSX.Element {
  return (
    <Stack spacing="lg">
      <Popular popularList={popularList} />
      <Anime timelineList={timelineList} />
      <Recomendation />
    </Stack>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      messages: (await import(`../lang/${ctx.locale}.json`)).default,
      popularList: await getPopularList(ctx.locale as SupportedLocales),
      timelineList: await getTimelineList(ctx.locale as SupportedLocales),
    },
  };
};
