import CustomCard from "@/components/CustomCard";
import { ActionIcon, Group, Title } from "@mantine/core";
import ContainerCard from "../ContainerCard";
import { IconChevronRight } from "@tabler/icons-react";
import useSWR from "swr";

/**
 * Popular content component.
 * @return {JSX.Element}
 */
export default function Popular(): JSX.Element {
  const { data, error, isLoading } = useSWR(
    "/api/search?query=bleach",
    (...args) => fetch(...args).then((res) => res.json())
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);

  return (
    <>
      <Group position="apart" mb={16}>
        <Title order={3} size={18}>
          Popular
        </Title>
        <ActionIcon variant="outline">
          <IconChevronRight />
        </ActionIcon>
      </Group>
      <ContainerCard styles={{ root: { rowGap: 10, columnGap: 10 } }}>
        {(Array.apply(null, Array(10)) as any).map((_: any, i: number) => (
          <CustomCard key={i} />
        ))}
      </ContainerCard>
    </>
  );
}
