import { Text } from "@mantine/core";
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
  return {
    props: {
      messages: (await import(`../lang/${ctx.locale}.json`)).default,
    },
  };
};
