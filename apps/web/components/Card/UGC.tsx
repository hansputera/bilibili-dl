import type { UGCCard } from "@bilibili-dl/interfaces/api";
import { Box, Card, Group, Text } from "@mantine/core";
import Image from "next/image";

type Props = UGCCard & { measureRef: any };

/**
 * Card Component.
 * @param {Props} props
 * @return {JSX.Element}
 */
export default function UGCCard(props: Props): JSX.Element {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      mb={{ xl: "xl", sm: "md" }}
      ref={props.measureRef}
    >
      <Card.Section>
        <Text
          component="a"
          href={`https://www.bilibili.tv/id/video/${props.aid}?bstar_from=bstar-web.homepage.trending.all`}
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
        <Group mt="xs" mb="xs" align="start" noWrap>
          <Text
            component="a"
            href={`https://www.bilibili.tv/id/space/${props.author.mid}`}
          >
            <Image
              style={{ borderRadius: "50%" }}
              width={36}
              height={36}
              src={`${props.author.avatar}@72w_72h_1e_1c_90q`}
              alt="Profile"
            />
          </Text>
          <Box
            sx={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "4px" }}
          >
            <Text component="p" m={0} pos="relative">
              <Text
                component="a"
                href={`https://www.bilibili.tv/id/video/${props.aid}?bstar_from=bstar-web.homepage.trending.all`}
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
                component="a"
                href={`https://www.bilibili.tv/id/space/${props.author.mid}`}
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <Text
                  component="span"
                  size={14}
                  sx={(theme) => ({
                    color: theme.colorScheme === "dark" ? "inherit" : "gray",
                  })}
                >
                  {props.author.nickname}
                </Text>
                {!!props.author.identity.icon && (
                  <Image
                    src="https://pic.bstarstatic.com/account/officialrole/2131737a5d53506575f10a7b34d4c4a8e78f2a52.png@32w_32h_1e_1c_90q"
                    width={16}
                    height={16}
                    alt="verified"
                    style={{ marginLeft: 2 }}
                  />
                )}
              </Text>
              <Text
                component="p"
                size={14}
                sx={(theme) => ({
                  color: theme.colorScheme === "dark" ? "inherit" : "gray",
                })}
                my={0}
              >
                {" "}
                &#160; · {props.view}
              </Text>
            </Box>
          </Box>
        </Group>
      </Card.Section>
    </Card>
  );
}
