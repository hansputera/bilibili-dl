import CustomCard from "@/components/CustomCard";
import { Title } from "@mantine/core";
import ContainerCard from "../ContainerCard";

/**
 * Popular content component.
 * @return {JSX.Element}
 */
export default function Popular(): JSX.Element {
  return (
    <>
      <Title order={3}>Popular</Title>
      <ContainerCard styles={{ root: { rowGap: 10, columnGap: 10 } }}>
        {(Array.apply(null, Array(10)) as any).map((_: any, i: number) => (
          <CustomCard key={i} />
        ))}
      </ContainerCard>
    </>
  );
}
