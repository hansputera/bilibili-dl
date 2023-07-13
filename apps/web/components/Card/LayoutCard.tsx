import type { LiveCard, OGVCard, UGCCard } from "@bilibili-dl/interfaces/api";
import { BackgroundImage, Box, Card, Text } from "@mantine/core";
import { FALLBACK_IMG, LABEL, SUBSCRIBER_IMG } from "config";
import Image from "next/image";
import MaskCard from "./MaskCard";
import BadgeCard from "./BadgeCard";

type Props = (LiveCard | OGVCard | UGCCard) & { measureRef?: any };

/**
 * Card Component.
 * @param {Props} props
 * @return {JSX.Element}
 */
export default function LayoutCard(props: Props): JSX.Element {
  const href =
    "https://www.bilibili.tv/en" +
    (props.card_type === "ogv_anime"
      ? `/play/${props.season_id}`
      : props.live
      ? `/live/${props.live.room_id}`
      : `/video/${(props as UGCCard).aid}`) +
    "?bstar_from=bstar-web.homepage.trending.all"; // tranding.all | recommend.all | anime.all
  return (
    <Card
      padding="lg"
      mb={{ xl: "xl", sm: "md" }}
      ref={props.measureRef}
      sx={{ backgroundColor: "transparent" }}
    >
      <Card.Section>
        <BackgroundImage
          src={FALLBACK_IMG}
          radius="8px"
          pos="relative"
          pt="56.25%"
          sx={{ overflow: "hidden" }}
        >
          <Text component="a" href={href} target="_blank">
            <Image
              src={`${props.cover}@720w_405h_1e_1c_90q`}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                position: "absolute",
              }}
              alt="Norway"
              fill
            />
          </Text>
          {/* displayed only for update info, timestamp, show info, live badge */}
          {props.card_type === "ogv_anime" ? (
            <MaskCard value={props.index_show} />
          ) : props.live ? (
            <MaskCard isLive />
          ) : (
            <MaskCard value={(props as UGCCard).duration} />
          )}
          {/* displayed only for premium, eksklusif (OGV only) */}
          {props.card_type === "ogv_anime" && (
            <BadgeCard text={LABEL[props.label]} />
          )}
        </BackgroundImage>
      </Card.Section>

      <Card.Section p={4}>
        <Box
          sx={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "4px" }}
        >
          <Text component="p" m={0} pos="relative">
            <Text
              component="a"
              href={href}
              weight="bold"
              target="_blank"
              sx={{
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {props.title}
            </Text>
          </Text>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "minmax(auto,max-content) max-content",
              alignItems: "center",
            }}
          >
            <Text
              sx={(theme) => ({
                color: theme.colorScheme === "dark" ? "inherit" : "gray",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              })}
              size={14}
            >
              {props.card_type === "ugc_video" ||
              props.card_type === "live_recommend"
                ? props.author.nickname
                : props.view}
            </Text>
            <Text
              component="p"
              size={14}
              pl={(props as LiveCard).live ? 14 : 0}
              pos="relative"
              sx={(theme) => ({
                color: theme.colorScheme === "dark" ? "inherit" : "gray",
                ...((props as LiveCard).live
                  ? {
                      "&::before": {
                        display: "block",
                        position: "absolute",
                        top: "50%",
                        left: "5px",
                        width: "12px",
                        height: "12px",
                        content: "''",
                        "margin-top": " -6px",
                        "background-image": `url(${SUBSCRIBER_IMG})`,
                        "background-size": "contain",
                        "background-repeat": "no-repeat",
                        "background-position": "center",
                      },
                    }
                  : {}),
              })}
              my={0}
            >
              {props.card_type === "ogv_anime" ? (
                !!props.style_list.length && (
                  <>&#160; · {props.style_list.join(" / ")}</>
                )
              ) : props.live ? (
                <>&#160; · {props.live.state}</>
              ) : (
                <>&#160; · {props.view}</>
              )}
            </Text>
          </Box>
        </Box>
      </Card.Section>
    </Card>
  );
}
