import { Card, Flex, Group, Text } from "@mantine/core";
import Image from "next/image";

/**
 * Card Component.
 * @return {JSX.Element}
 */
export default function LiveCard(): JSX.Element {
  return (
    <Card shadow="sm" padding="lg" radius="md" mb={{ xl: "xl", sm: "md" }}>
      <Card.Section>
        <Text
          component="a"
          href="https://www.bilibili.tv/id/video/2042059741?bstar_from=bstar-web.homepage.trending.all"
          target="_blank"
        >
          <Image
            src="https://pic-bstarstatic.akamaized.net/ugc/04acdad8ca2e0ab360b70e363d616558.jpg@720w_405h_1e_1c_90q"
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
        <Group mt="xs" mb="xs" align="start">
          {/* <Group mt="xs" mb="xs" align="start" noWrap> */}
          <Text
            component="a"
            href="https://www.bilibili.tv/id/space/2037353183"
          >
            <Image
              style={{ borderRadius: "50%" }}
              width={36}
              height={36}
              src="https://pic.bstarstatic.com/face/c4d4ab930ffd926ffac02228f334f0d5cd0482a1.png@72w_72h_1e_1c_90q"
              alt="Profile"
            />
          </Text>
          <Flex direction="column">
            <Text
              component="a"
              href="https://www.bilibili.tv/id/video/2042059741?bstar_from=bstar-web.homepage.trending.all"
              weight="bold"
              target="_blank"
              // sx={{
              //   textOverflow: "ellipsis",
              //   overflow: "hidden",
              //   whiteSpace: "nowrap",
              // }}
              // w={239}
            >
              Suster Ngesot
            </Text>
            {/* <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "minmax(auto,max-content) max-content",
                alignItems: "center",
              }}
            >
              <Text
                component="a"
                href="https://www.bilibili.tv/id/space/2037353183"
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
                  SANTOON TV
                </Text>
                <Image
                  src="https://pic.bstarstatic.com/account/officialrole/2131737a5d53506575f10a7b34d4c4a8e78f2a52.png@32w_32h_1e_1c_90q"
                  width={16}
                  height={16}
                  alt="verified"
                  style={{ marginLeft: 2 }}
                />
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
                &#160; · 34.0K Ditonton
              </Text>
            </Box> */}
            <Flex gap={5} align="center">
              <Text
                component="a"
                href="https://www.bilibili.tv/id/space/2037353183"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  // whiteSpace: "nowrap",
                }}
              >
                <Text
                  component="span"
                  size={14}
                  sx={(theme) => ({
                    color: theme.colorScheme === "dark" ? "inherit" : "gray",
                  })}
                >
                  SANTOON TV
                </Text>
                <Image
                  src="https://pic.bstarstatic.com/account/officialrole/2131737a5d53506575f10a7b34d4c4a8e78f2a52.png@32w_32h_1e_1c_90q"
                  width={16}
                  height={16}
                  alt="verified"
                  style={{ marginLeft: 2 }}
                />
              </Text>
              <Text
                size={14}
                sx={(theme) => ({
                  color: theme.colorScheme === "dark" ? "inherit" : "gray",
                })}
              >
                {" "}
                · 34.0K Ditonton
              </Text>
            </Flex>
          </Flex>
        </Group>
      </Card.Section>
    </Card>
  );
}
