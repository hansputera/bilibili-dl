import { rem, Group, Box, Text, Button } from "@mantine/core";

/**
 * Following Component.
 * @return {JSX.Element}
 */
export default function Following(): JSX.Element {
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
        <Text fz="sm" color="gray">
          Log in to view your "Followed" content.
        </Text>
        <Button variant="outline" fullWidth>
          Log in
        </Button>
      </Group>
    </Box>
  );
}
