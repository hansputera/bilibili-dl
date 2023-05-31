import Popular from "@/components/Home/Popular";
import { GetServerSidePropsContext } from "next";

/**
 * Index page.
 * @return {JSX.Element}
 */
export default function Index(): JSX.Element {
  return (
    <>
      <Popular />
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
