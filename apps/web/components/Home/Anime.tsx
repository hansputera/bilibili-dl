import { Carousel } from "@mantine/carousel";
import { Anchor, Button, Group, Title } from "@mantine/core";
import Image from "next/image";
import useAnimeCarousel from "hooks/useAnimeCarousel";
import {
  CarouselAnime,
  PickCarousel,
} from "@bilibili-dl/interfaces/web/home/anime.type";
import LayoutCard from "../Card/LayoutCard";

/**
 * Anime content component.
 * @return {JSX.Element}
 */
export default function Anime({
  animeList,
}: {
  animeList: CarouselAnime;
}): JSX.Element {
  const { items, selectedKey, handleOnSelect } = useAnimeCarousel(animeList);

  return (
    <>
      <Group spacing={0} mb={16}>
        <Title order={3} size={18}>
          Anime
        </Title>
        <Group sx={{ flexGrow: 1, flexShrink: 1 }} position="apart" ml="lg">
          <Carousel
            slideSize="10%"
            slideGap="xs"
            controlsOffset="xs"
            // containScroll="trimSnaps"
            align={0.1}
            dragFree
          >
            {animeList?.map((item) => (
              <Carousel.Slide key={item.key as PickCarousel}>
                <Button
                  size="xs"
                  variant={item.key === selectedKey ? "light" : "subtle"}
                  tt="capitalize"
                  onClick={() => handleOnSelect(item.key as PickCarousel)}
                >
                  {item.key}
                </Button>
              </Carousel.Slide>
            ))}
          </Carousel>
          <Anchor href="https://www.bilibili.tv/id/timeline">
            <Image
              src="https://p.bstarstatic.com/fe-lib/images/web/schedule/calendar-ms.png@326w_72h_1e_1c_1f.webp"
              width={172}
              height={38}
              alt="calendar"
            />
          </Anchor>
        </Group>
      </Group>
      <Carousel
        slideSize="20%"
        slideGap="xs"
        controlsOffset="xs"
        align="start"
        slidesToScroll={5}
      >
        {items?.cards.map((item, i) => (
          <Carousel.Slide key={i}>
            <LayoutCard {...item} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}
