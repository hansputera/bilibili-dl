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
  UnstyledButton,
  rem,
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
  const [openedLang, { toggle, close }] = useDisclosure(false);

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
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
          <Input
            placeholder={t("search")}
            rightSection={
              <IconSearch
                size="1rem"
                style={{ display: "block", opacity: 0.5 }}
              />
            }
          />
          <Group>
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
                <Menu.Item onClick={toggle} icon={<IconWorld size="1rem" />}>
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
      </div>
      <Dialog
        position={{ top: 20, right: 20 }}
        opened={openedLang}
        onClose={close}
        size="lg"
        radius="md"
      >
        <Stack>
          <UnstyledButton onClick={toggle}>
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
