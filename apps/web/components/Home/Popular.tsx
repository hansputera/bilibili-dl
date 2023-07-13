import { ActionIcon, Group, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import ContainerCard from "../ContainerCard";
import { PopularData } from "@bilibili-dl/interfaces/api";
import LayoutCard from "../Card/LayoutCard";

/**
 * Popular content component.
 * @return {JSX.Element}
 */
export default function Popular({
  popularList,
}: {
  popularList: PopularData;
}): JSX.Element {
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
      <ContainerCard>
        {popularList.cards.map((item, i) => (
          <LayoutCard key={i} {...item} />
        ))}
      </ContainerCard>
    </>
  );
}
