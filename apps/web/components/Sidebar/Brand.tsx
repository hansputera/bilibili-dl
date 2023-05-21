import { rem, Group, Box } from "@mantine/core";
import Logo from "/OpenBstation.svg";
import Image from "next/image";

/**
 * Brand Component.
 * @return {JSX.Element}
 */
export default function Brand(): JSX.Element {
  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `${rem(1)} solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Group spacing="xs">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Yin_and_Yang_symbol.svg/1200px-Yin_and_Yang_symbol.svg.png"
          alt="Yin and Yang symbol"
          width={30}
          height={30}
        />
        <Image src={Logo} alt="Logo Apps" />
      </Group>
    </Box>
  );
}
