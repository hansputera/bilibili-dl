import { Title } from "@mantine/core";
import ContainerCard from "../ContainerCard";
import useRecommendation from "hooks/useRecommendation";
import LayoutCard from "../Card/LayoutCard";

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
        {recommend.map((item, i) => (
          <LayoutCard key={i} {...item} measureRef={ref} />
        ))}
        <div ref={ref} />
      </ContainerCard>
    </>
  );
}
