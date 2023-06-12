import { rem, Group, Box, Text, Button } from "@mantine/core";
import { useTranslations } from "next-intl";

/**
 * Following Component.
 * @return {JSX.Element}
 */
export default function Following(): JSX.Element {
  const t = useTranslations("sidebar.Following");

  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingTop: theme.spacing.lg,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Group spacing="xs" sx={{ flexDirection: "column" }}>
        <Text
          fz="sm"
          sx={(theme) => ({
            color: theme.colorScheme === "dark" ? "inherit" : "gray",
          })}
        >
          {t("loginMessage")}
        </Text>
        <Button variant="outline" fullWidth>
          Log in
        </Button>
      </Group>
    </Box>
  );
}
