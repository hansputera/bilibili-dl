import { RecommendItem } from "@bilibili-dl/interfaces/api";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useMemo } from "react";
import useSWRInfinite from "swr/infinite";

export default function useRecommendation() {
  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<RecommendItem>(
      (pageIndex) => {
        return `/api/recommend?pn=${pageIndex + 1}`;
      },
      (args: RequestInfo) =>
        fetch(args)
          .then((res) => res.json())
          .then((res) => res.data.cards),
      {
        revalidateOnFocus: false,
        revalidateFirstPage: false,
      }
    );
  const { ref: scrollRef, entry } = useIntersection();

  const recommend_card = useMemo(
    () => (data ? ([] as RecommendItem[]).concat(...data) : []),
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
