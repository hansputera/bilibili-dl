import { Carousel } from "@mantine/carousel";
import { Anchor, Button, Group, Title } from "@mantine/core";
import Image from "next/image";
import CustomCard from "../CustomCard";

/**
 * Anime content component.
 * @return {JSX.Element}
 */
export default function Anime(): JSX.Element {
  return (
    <>
      <Group spacing={0} mb={16}>
        <Title order={3} size={18}>
          Anime
        </Title>
        <Group sx={{ flexGrow: 1, flexShrink: 1 }} position="apart" ml="lg">
          <Carousel
            slideSize="20%"
            slideGap="xs"
            controlsOffset="xs"
            align="start"
            dragFree
          >
            <Carousel.Slide>
              <Button size="xs" variant="light">
                Populer
              </Button>
            </Carousel.Slide>
            <Carousel.Slide>
              <Button size="xs" variant="subtle">
                Sel
              </Button>
            </Carousel.Slide>
            <Carousel.Slide>
              <Button size="xs" variant="subtle">
                Rab
              </Button>
            </Carousel.Slide>
            <Carousel.Slide>
              <Button size="xs" variant="subtle">
                Kam
              </Button>
            </Carousel.Slide>
            <Carousel.Slide>
              <Button size="xs" variant="subtle">
                Jum
              </Button>
            </Carousel.Slide>
            <Carousel.Slide>
              <Button size="xs" variant="subtle">
                Sab
              </Button>
            </Carousel.Slide>
            <Carousel.Slide>
              <Button size="xs" variant="subtle">
                Min
              </Button>
            </Carousel.Slide>
            <Carousel.Slide>
              <Button size="xs" variant="subtle">
                Sen
              </Button>
            </Carousel.Slide>
          </Carousel>
          {/* <Group spacing="xs">
            <Button size="xs" variant="light">
              Populer
            </Button>
            <Button size="xs" variant="subtle">
              Sel
            </Button>
            <Button size="xs" variant="subtle">
              Rab
            </Button>
            <Button size="xs" variant="subtle">
              Kam
            </Button>
            <Button size="xs" variant="subtle">
              Jum
            </Button>
            <Button size="xs" variant="subtle">
              Sab
            </Button>
            <Button size="xs" variant="subtle">
              Min
            </Button>
            <Button size="xs" variant="subtle">
              Sen
            </Button>
          </Group> */}
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
        {[...Array(10)].map((_, i) => (
          <Carousel.Slide key={i}>
            <CustomCard />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}
