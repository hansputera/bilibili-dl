import { ActionIcon, Group, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import ContainerCard from "../ContainerCard";
import UGC from "../Card/UGC";
import Live from "../Card/Live";
import { LiveCard, PopularData, UGCCard } from "@bilibili-dl/interfaces/api";

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
        {popularList.cards.map((item, i) =>
          item.card_type === "ugc_video" ? (
            <UGC key={i} {...(item as UGCCard)} />
          ) : (
            <Live key={i} {...(item as LiveCard)} />
          )
        )}
      </ContainerCard>
    </>
  );
}
