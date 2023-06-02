import Anime from "@/components/Home/Anime";
import Popular from "@/components/Home/Popular";
import { Stack } from "@mantine/core";
import { GetServerSidePropsContext } from "next";

/**
 * Index page.
 * @return {JSX.Element}
 */
export default function Index(): JSX.Element {
  return (
    <Stack spacing="lg">
      <Popular />
      <Anime />
    </Stack>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      messages: (await import(`../lang/${ctx.locale}.json`)).default,
    },
  };
};
