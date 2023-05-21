import { UnstyledButton, Group, ThemeIcon, Text } from "@mantine/core";
import {
  IconHome2,
  IconDeviceTv,
  IconFlame,
  IconFilterCog,
  IconBroadcast,
} from "@tabler/icons-react";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

const data = [
  {
    icon: <IconHome2 size="1rem" />,
    color: "blue",
    label: "Home",
  },
  {
    icon: <IconDeviceTv size="1rem" />,
    color: "teal",
    label: "Anime",
  },
  { icon: <IconFlame size="1rem" />, color: "violet", label: "Trending" },
  { icon: <IconFilterCog size="1rem" />, color: "grape", label: "Category" },
  { icon: <IconBroadcast size="1rem" />, color: "grape", label: "Live" },
];

/**
 * MainLink Component.
 * @return {JSX.Element}
 */
function MainLink({ icon, color, label }: MainLinkProps): JSX.Element {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

/**
 * MainLinks Component.
 * @return {JSX.Element}
 */
export default function MainLinks(): JSX.Element {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
