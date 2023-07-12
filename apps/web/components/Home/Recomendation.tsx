import { Title } from "@mantine/core";
import ContainerCard from "../ContainerCard";
import useRecommendation from "hooks/useRecommendation";
import OGV from "../Card/OGV";
import UGC from "../Card/UGC";
import { OGVCard, UGCCard } from "@bilibili-dl/interfaces/api";

/**
 * Recomendation content component.
 * @return {JSX.Element}
 */
export default function Recomendation(): JSX.Element {
  const { recommend, isLoading, error, ref } = useRecommendation();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Title order={3} size={18}>
        Direkomendasikan untukmu
      </Title>
      <ContainerCard styles={{ root: { gridAutoRows: "auto" } }}>
        {recommend.map((item, i) =>
          item?.card_type ? (
            item.card_type === "ogv_anime" ? (
              <OGV key={i} {...(item as OGVCard)} measureRef={ref} />
            ) : (
              <UGC key={i} {...(item as UGCCard)} measureRef={ref} />
            )
          ) : null
        )}
        <div ref={ref} />
      </ContainerCard>
    </>
  );
}
