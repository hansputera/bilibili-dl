import { ActionIcon, Group, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import type {
  LiveContent,
  PopularCards,
  UGCContent,
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
            <UGC key={i} {...(item as UGCContent)} />
          ) : (
            <Live key={i} {...(item as LiveContent)} />
          )
        )}
      </ContainerCard>
    </>
  );
}
