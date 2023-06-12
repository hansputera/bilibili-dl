import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";

export default function useRecommendation(): any {
  // const [incremental, setIncremental] = useState(1);
  // const [recommendList, setRecommendList] = useState<any>([]);

  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    (pageIndex, prevPageData) => {
      if (prevPageData && !prevPageData.length) return null;
      return `/api/recommend?ps=${pageIndex + 1}`;
    },
    (...args) => fetch(...args).then((res) => res.json())
  );
  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (Math.abs(scrollHeight - scrollTop - clientHeight) < 1) {
      // setIncremental((current) => current++);
      setSize(size + 1);
    }
  };

  // useEffect(() => {
  //   if (data) {
  //     setRecommendList((current: any) =>
  //       current.length ? [...current, data] : [data]
  //     );
  //   }
  // }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return {
    data,
    error,
    isLoading,
  };
}
