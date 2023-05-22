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
} from "@mantine/core";
import {
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

export default function Topbar({
  setOpened,
  opened,
}: {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  opened: boolean;
}) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const t = useTranslations();

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
            placeholder={t("topbar.search")}
            rightSection={
              <IconSearch
                size="1rem"
                style={{ display: "block", opacity: 0.5 }}
              />
            }
          />
          <Group>
            <Button leftIcon={<IconVideoPlus />} variant="outline">
              {t("topbar.create")}
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
                <Menu.Item icon={<IconWorld size="1rem" />}>
                  Language: English
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
    </Header>
  );
}
