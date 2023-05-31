import CustomCard from "@/components/CustomCard";
import { SimpleGrid, Title } from "@mantine/core";

/**
 * Popular content component.
 * @return {JSX.Element}
 */
export default function Popular(): JSX.Element {
  return (
    <>
      <Title order={3}>Popular</Title>
      <SimpleGrid cols={5}>
        {(Array.apply(null, Array(10)) as any).map((_: any, i: number) => (
          <CustomCard key={i} />
        ))}
      </SimpleGrid>
    </>
  );
}
