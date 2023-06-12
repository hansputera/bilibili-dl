import type { TimelineCard } from "@bilibili-dl/interfaces/core";
import { Box, Card, Text } from "@mantine/core";
import Image from "next/image";

/**
 * Card Component.
 * @param {TimelineCard} props
 * @return {JSX.Element}
 */
export default function OGVCard(props: TimelineCard): JSX.Element {
  return (
    <Card shadow="sm" padding="lg" radius="md" mb={{ xl: "xl", sm: "md" }}>
      <Card.Section>
        <Text
          component="a"
          href={`https://www.bilibili.tv/en/play/${props.season_id}?bstar_from=bstar-web.homepage.anime.all`}
          target="_blank"
        >
          <Image
            src={`${props.cover}@720w_405h_1e_1c_90q`}
            height={164}
            width={291}
            style={{
              width: "100%",
              height: "100%",
            }}
            alt="Norway"
          />
        </Text>
      </Card.Section>

      <Card.Section px={4} pb={4}>
        <Box
          sx={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "4px" }}
        >
          <Text component="p" m={0} pos="relative">
            <Text
              component="a"
              href={`https://www.bilibili.tv/en/play/${props.season_id}?bstar_from=bstar-web.homepage.anime.all`}
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
              {props.view}
            </Text>
            {!!props.style_list.length && (
              <Text
                component="p"
                size={14}
                sx={(theme) => ({
                  color: theme.colorScheme === "dark" ? "inherit" : "gray",
                })}
                my={0}
              >
                {" "}
                &#160; · {props.style_list.join(" / ")}
              </Text>
            )}
          </Box>
        </Box>
      </Card.Section>
    </Card>
  );
}
