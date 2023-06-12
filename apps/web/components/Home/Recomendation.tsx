import { Title } from "@mantine/core";
import ContainerCard from "../ContainerCard";
import useRecommendation from "hooks/useRecommendation";
import OGV from "../Card/OGV";
import UGC from "../Card/UGC";
import {
  OGVContent,
  RecommendationContent,
  UGCContent,
} from "@bilibili-dl/interfaces/core";

/**
 * Recomendation content component.
 * @return {JSX.Element}
 */
export default function Recomendation(): JSX.Element {
  const { data, isLoading, error } = useRecommendation();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);

  return (
    <>
      <Title order={3} size={18}>
        Direkomendasikan untukmu
      </Title>
      <ContainerCard styles={{ root: { gridAutoRows: "auto" } }}>
        {(data[0].data as RecommendationContent).map((item, i) =>
          item.card_type === "ogv_anime" ? (
            <OGV key={i} {...(item as OGVContent)} />
          ) : (
            <UGC key={i} {...(item as UGCContent)} />
          )
        )}
      </ContainerCard>
    </>
  );
}
