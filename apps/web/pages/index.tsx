import { Text } from "@mantine/core";
import { getLocale } from "lib/getLocale";
import { GetServerSidePropsContext } from "next";

/**
 * Index page.
 * @return {JSX.Element}
 */
export default function Index(): JSX.Element {
  return (
    <>
      <Text>Resize app to see responsive navbar in action</Text>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = await getLocale(ctx);

  return {
    props: {
      messages: (await import(`../lang/${locale}.json`)).default,
      locale,
    },
  };
};
