import { ActionIcon, Group, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import type {
  Live_Content,
  PopularCards,
  UGC_Content,
} from "@bilibili-dl/interfaces/core";
import ContainerCard from "../ContainerCard";
import UGC from "../Card/UGC";
import Live from "../Card/Live";

/**
 * Popular content component.
 * @return {JSX.Element}
 */
export default function Popular({
  popularList,
}: {
  popularList: PopularCards;
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
        {popularList.map((item, i) =>
          item.card_type === "ugc_video" ? (
            <UGC key={i} {...(item as UGC_Content)} />
          ) : (
            <Live key={i} {...(item as Live_Content)} />
          )
        )}
      </ContainerCard>
    </>
  );
}
