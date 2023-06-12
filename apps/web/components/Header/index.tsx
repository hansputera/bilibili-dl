import {
  Header,
  MediaQuery,
  Burger,
  ActionIcon,
  Group,
  useMantineColorScheme,
  useMantineTheme,
  Button,
  Input,
  Menu,
  Box,
  Center,
  Dialog,
  Divider,
  Stack,
  Flex,
  UnstyledButton,
  rem,
  Text,
  SimpleGrid,
  Anchor,
  Popover,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowLeft,
  IconBookmarkPlus,
  IconDotsVertical,
  IconHistory,
  IconMessageQuestion,
  IconMoonStars,
  IconSearch,
  IconSun,
  IconVideoPlus,
  IconWorld,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * Topbar Component
 * @param {TopbarProps} props Topbar Props.
 * @return {JSX.Element}
 */
export default function Topbar({
  setOpened,
  opened,
}: {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  opened: boolean;
}): JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const t = useTranslations("Topbar");
  const { locale } = useRouter();
  const [openedLang, { toggle: toggleLang, close: closeLang }] =
    useDisclosure(false);
  const [openedHot, { toggle: toggleHot, close: closeHot }] =
    useDisclosure(false);

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Flex align="center" h="100%">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Group position="apart" w="100%">
          <Image
            src="/OpenBstation.svg"
            alt="Logo Apps"
            width={80 * 2}
            height={34 * 2}
          />
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Popover
              opened={openedHot}
              onClose={closeHot}
              width="37.25rem"
              radius="md"
              position="bottom"
              shadow="md"
            >
              <Popover.Target>
                <Input
                  w="32%"
                  onFocus={toggleHot}
                  placeholder={t("search")}
                  rightSection={
                    <IconSearch
                      size="1rem"
                      style={{ display: "block", opacity: 0.5 }}
                    />
                  }
                />
              </Popover.Target>
              <Popover.Dropdown py="24px">
                <SimpleGrid cols={2} spacing={12} sx={{ fontSize: 12 }}>
                  {[...Array(19)].map((_, i) => (
                    <SimpleGrid
                      spacing={6}
                      sx={{ gridTemplateColumns: "40px 1fr" }}
                      key={i}
                    >
                      <Anchor
                        sx={{
                          ":hover": { textDecoration: "none" },
                          wordBreak: "break-word",
                        }}
                        color="#333"
                        href="https://www.bilibili.tv/id/play/37976"
                        target="_blank"
                      >
                        <Image
                          src="https://pic.bstarstatic.com/ogv/56076fdff40680ee5cc087adf7a2c34357b04b27.jpg@80w_104h_1e_1c_1f.webp"
                          alt="Thumbnail Anime"
                          width={40}
                          height={52}
                        />
                      </Anchor>
                      <Box>
                        <Anchor
                          sx={{
                            ":hover": { textDecoration: "none" },
                            wordBreak: "break-word",
                          }}
                          color="#333"
                          href="https://www.bilibili.tv/id/play/37976"
                          target="_blank"
                        >
                          One Piece
                        </Anchor>
                        <Text>1999 · Petualangan / Action · Memperbarui</Text>
                      </Box>
                    </SimpleGrid>
                  ))}
                </SimpleGrid>
              </Popover.Dropdown>
            </Popover>
          </MediaQuery>
          <Group>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <ActionIcon children={<IconSearch size="1rem" />} />
            </MediaQuery>
            <Button leftIcon={<IconVideoPlus />} variant="outline">
              {t("create")}
            </Button>
            <ActionIcon onClick={() => toggleColorScheme()}>
              {colorScheme === "dark" ? (
                <IconSun size="1rem" />
              ) : (
                <IconMoonStars size="1rem" />
              )}
            </ActionIcon>
            <ActionIcon>
              <IconHistory size="1rem" />
            </ActionIcon>
            <ActionIcon>
              <IconBookmarkPlus size="1rem" />
            </ActionIcon>
            <Menu>
              <Menu.Target>
                <ActionIcon>
                  <IconDotsVertical size="1rem" />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  onClick={toggleLang}
                  icon={<IconWorld size="1rem" />}
                >
                  Language: {locale === "id-ID" ? "Indonesia" : "English"}
                </Menu.Item>
                <Menu.Item icon={<IconMessageQuestion size="1rem" />}>
                  Send Feedback
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Button>Login</Button>
          </Group>
        </Group>
      </Flex>
      <Dialog
        position={{ top: 20, right: 20 }}
        opened={openedLang}
        onClose={closeLang}
        size="lg"
        radius="md"
      >
        <Stack>
          <UnstyledButton onClick={toggleLang}>
            <Center inline>
              <IconArrowLeft size={rem(14)} />
              <Box ml={5}>Select Language</Box>
            </Center>
          </UnstyledButton>
          <Divider />
          <Button component={Link} locale="en-US" href="/" variant="subtle">
            English
          </Button>
          <Button component={Link} locale="id-ID" href="/" variant="subtle">
            Bahasa Indonesia
          </Button>
        </Stack>
      </Dialog>
    </Header>
  );
}
