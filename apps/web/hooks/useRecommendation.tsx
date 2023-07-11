import { RecommendationContent } from "@bilibili-dl/interfaces/core";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useMemo } from "react";
import useSWRInfinite from "swr/infinite";

export default function useRecommendation() {
  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<RecommendationContent>(
      (pageIndex) => {
        return `/api/recommend?pn=${pageIndex + 1}`;
      },
      (...args) =>
        fetch(...args)
          .then((res) => res.json())
          .then((res) => res.data),
      {
        revalidateOnFocus: false,
        revalidateFirstPage: false,
      }
    );
  const { ref: scrollRef, entry } = useIntersection();

  const recommend_card = useMemo(
    () => (data ? ([] as RecommendationContent[]).concat(...data) : []),
    [data]
  );

  useEffect(() => {
    if (!isValidating && entry?.isIntersecting) {
      setSize(size + 1);
    }
  }, [entry?.isIntersecting]);

  return {
    recommend: recommend_card,
    error,
    isLoading,
    ref: scrollRef,
  };
}
