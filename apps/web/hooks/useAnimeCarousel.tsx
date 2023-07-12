import {
  CarouselAnime,
  PickCarousel,
} from "@bilibili-dl/interfaces/web/home/anime.type";
import { useRouter } from "next/router";
import { useState } from "react";

export default function useAnimeCarousel(animeList: CarouselAnime) {
  const { locale } = useRouter();
  // todo: bruhh should i call current locale state then use ternary operator?
  const [selectedKey, setSelectedKey] = useState(
    locale === "en-US" ? PickCarousel.popular : PickCarousel.populer
  );
  const handleOnSelect = (key: PickCarousel) => {
    setSelectedKey(key);
  };

  return {
    selectedKey,
    items: animeList.find((item) => item.key == selectedKey),
    handleOnSelect,
  };
}
