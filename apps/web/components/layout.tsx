import { useState } from "react";
import {
  AppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  useMantineColorScheme,
  ActionIcon,
  Group,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import Sidebar from "./Sidebar";
import Image from "next/image";

/**
 * Main Layout Component.
 * @return {JSX.Element}
 */
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<Sidebar hiddenBreakpoint="sm" hidden={!opened} children />}
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
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
              <ActionIcon
                variant="default"
                onClick={() => toggleColorScheme()}
                size={30}
              >
                {colorScheme === "dark" ? (
                  <IconSun size="1rem" />
                ) : (
                  <IconMoonStars size="1rem" />
                )}
              </ActionIcon>
            </Group>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
