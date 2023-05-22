import { useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import Sidebar from "./Sidebar";
import Topbar from "./Header";

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
      navbar={<Sidebar hiddenBreakpoint="sm" hidden={!opened} children />}
      header={<Topbar setOpened={setOpened} opened={opened} />}
    >
      {children}
    </AppShell>
  );
}
