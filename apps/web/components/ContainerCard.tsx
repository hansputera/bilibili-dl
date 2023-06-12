import { Box, DefaultProps, Selectors } from "@mantine/core";
import useStyles from "@/styles/ContainerCard.styles";

type ContainerCardStylesNames = Selectors<typeof useStyles>;

interface ContainerCardProps
  extends React.PropsWithChildren<DefaultProps<ContainerCardStylesNames>> {}

/**
 * ContainerCard component.
 * @return {JSX.Element}
 */
export default function ContainerCard({
  classNames,
  styles,
  unstyled,
  children,
}: ContainerCardProps): JSX.Element {
  const { classes, cx } = useStyles(undefined, {
    name: "ContainerCard",
    classNames,
    styles,
    unstyled,
  });

  return <Box className={cx(classes.root)}>{children}</Box>;
}
